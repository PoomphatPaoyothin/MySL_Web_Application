import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { JwtPayload } from "./jwt-payload.interface";
import { UserInput } from "./user.input";

@Injectable()
export class loginService{
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private JwtService: JwtService
    ){}
    
    async validateUserPassword(User_email:string,User_password:string): Promise<any>{
        const user = await this.userRepo.findOne({where:{User_email:User_email}})

        if(!user){
            throw new UnauthorizedException('no user');
        }
        else if(user && user.validatePassword(User_password)){
            return user.User_email;
        }
        else{
            return null;
        }
    }

    async login(user:any){
        const User_email = await this.validateUserPassword(user.User_email,user.User_password);

        if(!User_email){
            throw new UnauthorizedException('no user');
        }

        const payload: JwtPayload = {User_email};
        const accessToken = await this.JwtService.sign(payload);

        // var axios = require('axios');
        // var config = {
        //     method: 'get',
        //     url: 'http://localhost:3000/login/getuserdata',
        //     headers:{
        //         'Authorization': `Bearer ${accessToken}`
        //     }
        // };

        // const res = await axios(config);
        // const data = res.data;
        return {"accessToken": accessToken};
    }

    async getuserdata(
        user:User,
    ){
        const id = user._id;
        const User_email = user.User_email;

        return {"id": id,"User_email": User_email}
    }
    
}