import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { wordcategory } from "src/Word/category.entity";
// import EmailService from "./register/email.service";
// import { EmailConfirmationService } from "./register/emailConfirm.service";
import { registerService } from "./register/register.service";
import { RegisterController } from "./register/register.controller";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { usercatstat } from "./usercatstat.entity";
import { userfollower } from "./userfollower.entity";
import { userfollowing } from "./userfollowing.entity";
import { userlessoncheckpoint } from "./userlessoncheckpoint.entity";
import { userlessonstat } from "./userlessonstat.entity";
import { userstatnav } from "./userstatnav.entity";
import { EmailConfirmationService } from "./register/emailConfirm.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            User,
            usercatstat,
            userstatnav,
            userlessoncheckpoint,
            userlessonstat,
            userfollower,
            userfollowing,
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