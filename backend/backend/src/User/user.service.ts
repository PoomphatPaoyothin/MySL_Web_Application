import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { usercatstat } from "./usercatstat.entity";
import { userstatnav } from "./userstatnav.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepo : Repository<User>,
        @InjectRepository(usercatstat)
        private usercatstatRepo : Repository<usercatstat>,
        @InjectRepository(userstatnav)
        private userstatnavRepo: Repository<userstatnav>,
    ){}

    async findUserEmail(useremail:string){
        return this.userRepo.findOne({where:{User_email:useremail}});
    }
    
    async findUserProfile(id:string) {
        return this.userRepo.findOne({where:{ID:id}});
    }

    async getUserStatCat(id:string){
        return this.usercatstatRepo.find({where:{UserID:id}});
    }

    async getUserStatNav(id:string){
        return this.userstatnavRepo.findOne({where:{UserID:id}});
    }

    private async hashpassword(password: string,saltRound: number): Promise<string>{
        return bcrypt.hash(password,saltRound);
    }

    async updateUserPassword(password:string,id:string){
        const getUser = await this.findUserProfile(id);
        const saltRound = 12;
        getUser.User_password = await this.hashpassword(password,saltRound);
        await this.userRepo.save(getUser);
        return getUser;
    }
}