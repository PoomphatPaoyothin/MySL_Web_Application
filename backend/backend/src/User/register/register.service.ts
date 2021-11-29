import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import * as bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';

@Injectable()
export class registerService{
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ){}

    private async hashpassword(password: string,saltRound: number): Promise<string>{
        return bcrypt.hash(password,saltRound);
    }

    async createAccount(RegisterInput: any): Promise<object>{
        const {
                User_prefix_name,
                User_name,
                User_surname,
                User_email,
                User_password,
        } = RegisterInput;

        const checkemail = await this.userRepo.findOne({where:{User_email:User_email}});
        const timeupdate = new Date();
        if(checkemail){
            throw new ConflictException('email already exist');
        }
        const saltRound = 12;
        const user = this.userRepo.create({
            ID: uuid,
            User_prefix_name: User_prefix_name,
            User_password: await this.hashpassword(User_password,saltRound),
            User_email: User_email,
            User_name: User_name,
            User_surname: User_surname,
            timeupdate: timeupdate,
            imguser: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            follower_amount: 0,
            following_amount: 0,
            Is_delete:false,
        })

        await this.userRepo.save(user);
        const id = user.ID;

        return {"userId":id}; 
    }
}