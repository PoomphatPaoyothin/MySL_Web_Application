import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { registerService } from "./register/register.service";
import { RegisterController } from "./register/regitster.controller";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { usercatstat } from "./usercatstat.entity";
import { userfollower } from "./userfollower.entity";
import { userfollowing } from "./userfollowing.entity";
import { userlessoncheckpoint } from "./userlessoncheckpoint.entity";
import { userlessonstat } from "./userlessonstat.entity";
import { userstatnav } from "./userstatnav.entity";

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
        ])
    ],
    providers:[
        UserService,registerService
    ],
    exports:[UserService,],
    controllers:[UserController,RegisterController]
})
export class UserModule{}