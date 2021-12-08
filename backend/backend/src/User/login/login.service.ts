import { ConsoleLogger, flatten, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { JwtPayload } from "./jwt-payload.interface";
import { UserInput } from "./user.input";
import * as bcrypt from 'bcrypt';

@Injectable()
export class loginService{
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private JwtService: JwtService
    ){}
    
    
    async validateUserPassword(User_email:string,User_password:string): Promise<any>{
        const user = await this.userRepo.findOne({where:{User_email:User_email}})

        const hash = bcrypt.compareSync(User_password,user.User_password);
        if(hash == true){
            console.log('Valid password')
            return user.User_email;
        }
        else if(!user){
            throw new UnauthorizedException('no user');
        }
        else{
            console.log('Invalid password')
        }
        
        // bcrypt.compare(User_password,user.User_password,function(err,result){
        //     if(result){
        //         console.log('asdfaisjdfiajsdifoj');
        //         // console.log(user.User_email);
        //         return user.User_email;
        //     }
        //     else if(!user){
        //         throw new UnauthorizedException('no user');
        //     }
        //     else{
        //         throw new UnauthorizedException('invalid password');
        //     }
        // })
        
    }

    async findOneUser(useremail:any):Promise<User>{
        return await this.userRepo.findOne({where:{User_email:useremail}});
        
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

        // console.log(User_email)

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
        return {"accessToken": accessToken,"userId": getIdUser,"userName":getUserName};
    }

    // async getuserdata(
    //     user:User,
    // ){
    //     const id = user._id;
    //     const User_email = user.User_email;

    //     return {"id": id,"User_email": User_email}
    // }

    // async test(user:User){
    //     return {"useremail": user.validatePassword(user.User_password),"pass":user.User_password}
    // }
    
}