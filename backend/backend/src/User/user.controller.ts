import { Body, Controller, Get, Param, ParseArrayPipe, Patch, Post } from "@nestjs/common";
import { EmailConfirmationService } from "./register/emailConfirm.service";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { usercatstat } from "./usercatstat.entity";
import { userfollower } from "./userfollower.entity";
import { userfollowing } from "./userfollowing.entity";
import { userlessoncheckpoint } from "./userlessoncheckpoint.entity";
import { userlessonstat } from "./userlessonstat.entity";
import { userstatnav } from "./userstatnav.entity";

@Controller('user')
export class UserController{
    constructor(private userService:UserService
    ){}

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
        return this.userService.getUserAllStatCat(id);
    }

    @Get('profile/navstat/:id')
    async GetUserNavStat(@Param('id') id:string): Promise<userstatnav>{
        return this.userService.getUserStatNav(id);
    }

    @Get('profile/lessonstat/:userid')
    async GetUserLessonStat(@Param('userid') userid:string): Promise<userlessonstat[]>{
        return this.userService.getUserAllLessonStat(userid);
    }

    @Get('profile/lessoncheckpoint/:userid')
    async GetUsercheckpoint(@Param('userid') userid: string): Promise<userlessoncheckpoint[]>{
        return this.userService.getUsercheckpoint(userid);
    }

    // @Get('profile/amountfollower/:userid')
    // async GetAmountFollower(@Param('userid') userid:string) :Promise<any>{
    //     return this.userService.getAmountFollower(userid);
    // }

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

    @Patch(':userid/updatefollower')
    async updateFollower(@Param('userid') userid: string): Promise<User>{
        return this.userService.updateFollowerAmount(userid);
    }

    @Patch(':userid/updatefollowing')
    async updateFollowing(@Param('userid') userid: string): Promise<User>{
        return this.userService.updateFollowingAmount(userid);
    }

    @Patch(':userid/updateUNfollower')
    async updateUNFollower(@Param('userid') userid: string): Promise<User>{
        return this.userService.updateUNFollowerAmount(userid);
    }

    @Patch(':userid/updateUNfollowing')
    async updateUNFollowing(@Param('userid') userid: string): Promise<User>{
        return this.userService.updateUNFollowingAmount(userid);
    }

    @Post('/createfollower')
    async createfollower(
        @Body('userid1') userid1: string,
        @Body('userid2') userid2: string
    ): Promise<any>{
        return this.userService.createfollower(userid1,userid2);
    }

    @Post('/createfollowing')
    async createfollowing(
        @Body('userid1') userid1: string,
        @Body('userid2') userid2: string
    ): Promise<any>{
        return this.userService.createfollowing(userid1,userid2);
    }

    @Get('userfollower/:userid')
    async getUserfollower(@Param('userid') userid: string):Promise<userfollower[]>{
        return this.userService.getUserFollower(userid);
    }

    @Get('userfollowing/:userid')
    async getUserfollowing(@Param('userid') userid: string):Promise<userfollowing[]>{
        return this.userService.getUserFollowing(userid);
    }

    @Post('checkpassword/:userid')
    async checkpassword(@Param('userid') userid: string,
                        @Body ('User_password') User_password: string): Promise<any>{
        return this.userService.checkpassword(userid,User_password);
    }

    @Patch('/updateUnfollower')
    async updateUnfollower(@Body('userid1') userid1:string,
                        @Body('userid2') userid2:string): Promise<any>{
        return this.userService.updateUnfollower(userid1,userid2);                 
    }

    @Patch('/updateUnfollowing')
    async updateUnfollowing(@Body('userid1') userid1:string,
                        @Body('userid2') userid2:string): Promise<any>{
        return this.userService.undateUnfollowing(userid1,userid2);
    }

    @Patch(':userid/confirmemail')
    async confirmEmail(@Param('userid') userid:string):Promise<any>{
        return this.userService.confirmEmail(userid);
    }

    @Patch(':userid/changepassword')
    async changepassword(@Param('userid') userid: string,
                        @Body('newpassword') newpassword:string):Promise<any>{
        return this.userService.changepassword(userid,newpassword);
    }
}
