import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { usercatstat } from "./usercatstat.entity";
import { userstatnav } from "./userstatnav.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([User,usercatstat,userstatnav])
    ],
    providers:[
        UserService,
    ],
    exports:[UserService],
    controllers:[UserController]
})
export class UserModule{}