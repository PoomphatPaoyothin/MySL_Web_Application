import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import * as bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import { check } from "prettier";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../login/jwt-payload.interface";
import { access } from "fs";

@Injectable()
export class registerService{
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private JwtService: JwtService
    ){}

    private async hashpassword(password: string,saltRound: number): Promise<string>{
        return bcrypt.hash(password,saltRound);
    }

    async createAccountFirst(RegisterInput: any,num:number): Promise<object>{
        const {
                User_email,
                User_password,
        } = RegisterInput;

        const checkemail = await this.userRepo.findOne({where:{User_email:User_email,Is_delete:false}});
        const timeupdate = new Date();
        if(checkemail){
            throw new ConflictException('email already exist');
        }
        const Numstring = num.toString();
        const saltRound = 12;
        const user = this.userRepo.create({
            ID: uuid(),
            User_password: await this.hashpassword(User_password,saltRound),
            User_email: User_email,
            timeupdate: timeupdate,
            imguser: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            follower_amount: 0,
            following_amount: 0,
            register_stat:'1',
            Is_email_confirm:false,
            temp:Numstring,
            Is_delete:false,
        })

        await this.userRepo.save(user);
        console.log(user);
        const id = user.ID;

        return {"userId":id,"otp":num}; 
    }

    async createAccountSecond(id:string,RegisterInput: any):Promise<object>{
        const {
            User_prefix_name,
            User_name,
            User_surname,
        } = RegisterInput;

        const timeupdate = new Date();

        const getUser = await this.userRepo.findOne({where:{ID:id}});
        if(!getUser){
            throw new UnauthorizedException('cant find user');
        }
        getUser.User_name = User_name;
        getUser.User_prefix_name = User_prefix_name;
        getUser.User_surname = User_surname;
        getUser.timeupdate =  timeupdate;
        getUser.Is_email_confirm = true;
        getUser.register_stat = '3';
        getUser.temp = null;

        const User_email = getUser.User_email;
        const userId = getUser.ID;
        const payload: JwtPayload = {User_email};
        const accessToken = await this.JwtService.sign(payload);
        
        await this.userRepo.save(getUser);
        return {"accessToken":accessToken,"UserId":userId};
    }

    async checkotp(id:string,otp:string){
        const getUser = await this.userRepo.findOne({where:{ID:id}});
        const User_email = getUser.User_email;
        const User_id = getUser.ID;
        if(!getUser){
            throw new UnauthorizedException('cant find user');
        }
        
        const userotp = getUser.temp;
        if(userotp === otp){
            getUser.register_stat = '2';
            await this.userRepo.save(getUser);
            return true;
        }
        else{
            return false;
        }
    }

    async forgotpassword(id:string){
        const getUser = await this.userRepo.findOne({where:{ID:id}});
        if(!getUser){
            throw new UnauthorizedException('cant find user');
        }
    }

    async findUserProfile(id:string) {
        return this.userRepo.findOne({where:{ID:id}});
    }

    async findUserByEmail(email:string){
        return this.userRepo.findOne({where:{User_email:email}})
    }

    async updateotp(email:string,num:number){
        const numstring = num.toString();
        const getUser = await this.userRepo.findOne({where:{User_email:email}});
        getUser.temp = numstring;
        await this.userRepo.save(getUser);
        return true;
    }

    async checkotpwithemail(email:string,otp:string){
        const getUser = await this.userRepo.findOne({where:{User_email:email}});
        const userotp = getUser.temp;
        const User_email = getUser.User_email;
        const userId = getUser.ID;
        const payload: JwtPayload = {User_email};
        const accessToken = await this.JwtService.sign(payload);
        if(userotp === otp){
            return {"accessToken":accessToken,"UserId":userId};
        }
        else{
            return false;
        }
    }

    async changeforgotpassword(email:string,password:string){
        const getUser = await this.userRepo.findOne({where:{User_email:email}})
        const User_email = getUser.User_email;
        const UserId = getUser.ID;
        if(!getUser){
            throw new UnauthorizedException('cant find user');
        }
        const saltRound = 12;
        const new_password = await this.hashpassword(password,saltRound);
        const payload: JwtPayload = {User_email};
        const accessToken = await this.JwtService.sign(payload);
        getUser.User_password = new_password;
        await this.userRepo.save(getUser);
        return {"accessToken":accessToken,"UserId":UserId};
    }
}