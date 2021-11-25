import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepo : Repository<User>
    ){}

    async findOneUser(useremail:string){
        return this.userRepo.findOne({where:{User_email:useremail}});
    }
    
}