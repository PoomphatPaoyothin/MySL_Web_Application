import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "../User_entity/user.entity";
import { JwtPayload } from "./jwt-payload.interface";

require('dotenv').config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private userRepo : Repository<User>,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY,
        })
    }

    //check if user valid
    async validate(payload: JwtPayload){
        const {User_email} = payload;
        const user = await this.userRepo.findOne({User_email});
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}