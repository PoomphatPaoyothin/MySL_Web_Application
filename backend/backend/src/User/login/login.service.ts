import {  Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../User_entity/user.entity";
import { JwtPayload } from "./jwt-payload.interface";
import * as bcrypt from 'bcrypt';

@Injectable()
export class loginService{
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private JwtService: JwtService
    ){}

    //get one user by email
    async findOneUser(useremail:any):Promise<User>{
        return await this.userRepo.findOne({where:{User_email:useremail,Is_delete:false}});
    }
    
    //check user email and password correct; if correct return user email for payload
    async validateUserPassword(User_email:string,User_password:string): Promise<any>{
        const user = await this.userRepo.findOne({where:{User_email:User_email}})
        const hash = bcrypt.compareSync(User_password,user.User_password);

        if(!user){
            throw new UnauthorizedException('no user');
        }else if(hash == true){
            // console.log('Valid password')
            return user.User_email;
        }else{
            // console.log('Invalid password')
            throw new UnauthorizedException('password wrong');
        }
    }

    async login(user:any){
        const User_email = await this.validateUserPassword(user.User_email,user.User_password);
        const getUser = this.findOneUser(user.User_email);
        const getIdUser = (await getUser).ID;
        const getUserName = (await getUser).User_name;
        console.log(User_email);
        if(!User_email){
            throw new UnauthorizedException('password wrong');
        }
        //sign payload for access token
        const payload: JwtPayload = {User_email};
        const accessToken = await this.JwtService.sign(payload);

        return {"accessToken": accessToken,"userId": getIdUser,"userName":getUserName};
    }
}