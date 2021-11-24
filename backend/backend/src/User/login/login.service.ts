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
    
    async validateUserPassword(userinput: UserInput): Promise<any>{
        const {User_email,User_password} = userinput;
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

    async login(userinput: UserInput){
        const User_email = await this.validateUserPassword(userinput);

        if(!User_email){
            throw new UnauthorizedException('no user');
        }

        const payload: JwtPayload = {User_email};
        const accessToken = await this.JwtService.sign(payload);

        var axios = require('axios');
        var config = {
            method: 'get',
            url: 'http://localhost:3000/login/getuserdata',
            headers:{
                'Authorization': `Bearer ${accessToken}`
            }
        };

        const res = await axios(config);
        const data = res.data;
        return {"accessToken": accessToken,"id": data.id,"User_email": data.User_email};
    }

    async getuserdata(
        user:User,
    ){
        const id = user._id;
        const User_email = user.User_email;

        return {"id": id,"User_email": User_email}
    }
    
}