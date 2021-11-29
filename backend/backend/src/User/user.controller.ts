import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { usercatstat } from "./usercatstat.entity";
import { userstatnav } from "./userstatnav.entity";

@Controller('user')
export class UserController{
    constructor(private userService:UserService ){}

    @Get('findemail/:useremail')
    async findUseremail(@Param('useremail') User_email: string):Promise<User>{
        return this.userService.findUserEmail(User_email);
    }
    
    @Get('profile/:id')
    async findUserProfile(@Param('id') id:string): Promise<User>{
        return this.userService.findUserProfile(id);
    }

    @Get('profile/catstat/:id')
    async GetUsercatstat(@Param('id') id:string): Promise<usercatstat[]>{
        return this.userService.getUserStatCat(id);
    }

    @Get('profile/navstat/:id')
    async GetUserNavStat(@Param('id') id:string): Promise<userstatnav>{
        return this.userService.getUserStatNav(id);
    }

    @Patch(':userid/setting/password')
    async updateUserPassword(@Param('userid') userid: string,
                            @Body('password') password: string): Promise<User>{
        return this.userService.updateUserPassword(userid,password);
    }
}
