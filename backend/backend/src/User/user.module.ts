import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { wordcategory } from "src/Word/category.entity";
import { UserController } from "./user.controller";
import { User } from "./User_entity/user.entity";
import { UserService } from "./user.service";
import { usercatstat } from "./User_entity/usercatstat.entity";
import { userlessoncheckpoint } from "./User_entity/userlessoncheckpoint.entity";
import { userlessonstat } from "./User_entity/userlessonstat.entity";
import { userstatnav } from "./User_entity/userstatnav.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            User,
            usercatstat,
            userstatnav,
            userlessoncheckpoint,
            userlessonstat,
            wordcategory,
        ]),
    ],
    providers:[
        UserService
    ],
    exports:[UserService],
    controllers:[UserController]
})
export class UserModule{}