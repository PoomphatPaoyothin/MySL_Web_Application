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

    // @Get('profile/catstat/:id')
    // async GetUsercatstat(@Param('id') id:string): Promise<usercatstat[]>{
    //     return this.userService.getUserStatCat(id);
    // }

    @Get('profile/navstat/:id')
    async GetUserNavStat(@Param('id') id:string): Promise<userstatnav>{
        return this.userService.getUserStatNav(id);
    }

    @Patch(':userid/setting/password')
    async updateUserPassword(@Param('userid') userid: string,
                            @Body('password') password: string): Promise<User>{
        return this.userService.updateUserPassword(userid,password);
    }

    @Patch(':userid/setting/username')
    async updateUserName(@Param('userid') userid: string,
                        @Body('User_prefix_name') User_prefix_name: string,
                        @Body('User_name') User_name: string,
                        @Body('User_surname') User_surname: string): Promise<User>{
        return this.userService.updateUserName(userid,User_prefix_name,User_name,User_surname);
    }

    @Patch(':userid/setting/delete')
    async deleteAccount(@Param('userid') userid:string): Promise<User>{
        return this.userService.deleteAccount(userid);
    }

    @Patch(':userid/navbarstat/lesson')
    async updateNavbarLesson(@Param('userid') userid: string): Promise<userstatnav>{
        return this.userService.updateNavbarLesson(userid);
    }

    @Patch(':userid/navbarstat/quiz')
    async updateNavBarQuiz(@Param('userid') userid: string,
                        @Body('score') score: number): Promise<userstatnav>{
        return this.userService.updateNavbarQuiz(userid,score);
    }

    @Patch(':userid/userstat/cat')
    async updateUserStatCat(@Param('userid') userid: string,
                            @Body('catid') catid: string,
                            @Body('score') score:number): Promise<usercatstat>{
        return this.userService.updateUserStatCat(userid,catid,score);
    }
}
