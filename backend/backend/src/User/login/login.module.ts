import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../User_entity/user.entity";
import { JwtStrategy } from "./jwt.strategy";
import { loginController } from "./login.controller";
import { loginService } from "./login.service";

require('dotenv').config()

@Module({
    imports:[
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret:process.env.SECRET_KEY,
            signOptions: {expiresIn: '60m'}
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [loginService,JwtStrategy],
    controllers: [loginController],
    exports: [PassportModule,JwtStrategy
    ]
})

export class loginModule{}