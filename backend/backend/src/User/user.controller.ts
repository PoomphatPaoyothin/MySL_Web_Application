import { Body, Controller, Get, Param, ParseArrayPipe, Patch, Post } from "@nestjs/common";
import { User } from "../User/User_entity/user.entity";
import { UserService } from "./user.service";
import { usercatstat } from "./User_entity/usercatstat.entity";
import { userlessoncheckpoint } from "./User_entity/userlessoncheckpoint.entity";
import { userlessonstat } from "./User_entity/userlessonstat.entity";
import { userstatnav } from "./User_entity/userstatnav.entity";

@Controller('user')
export class UserController{
    constructor(private userService:UserService
    ){}

//==================================== User-Profile ====================================
    @Get('getalluser')
    async findalluser():Promise<any>{
        return this.userService.findalluser();
    }
    
    @Get('findemail/:useremail')
    async findUseremail(@Param('useremail') User_email: string):Promise<User>{
        return this.userService.findUserEmail(User_email);
    }
    
    @Get('profile/:id')
    async findUserProfile(@Param('id') id:string): Promise<User>{
        return this.userService.findUserProfile(id);
    }
//====================================END-User-Profile ====================================


//====================================User-Setting====================================
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

    @Patch(':userid/changepassword')
    async changepassword(@Param('userid') userid: string,
                        @Body('newpassword') newpassword:string):Promise<any>{
        return this.userService.changepassword(userid,newpassword);
    }

    @Patch('updateuserimg/:userid')
    async updateuserimg(@Param('userid') userid:string):Promise<any>{
        return this.userService.updateuserpicture(userid)
    }
//================================= END-User-Setting ====================================


//======================== Update-And-Create-User-Stat ====================================
    //**************************** GET ******************************/
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

    @Get('usernavbarstat/:userid')
    async getusernavbarstat(@Param('userid') userid:string):Promise<any>{
        return this.userService.getusernavbarstat(userid)
    }

    @Get('getusercatstat/:userid/:catid')
    async getusercatstat(@Param('userid') userid:string,
                        @Param('catid') catid:string):Promise<any>{
        return this.userService.getusercatstat(userid,catid)
    }

    @Get(':userid/:catid/getlessonstat')
    async getlessonuserstat(@Param('userid') userid:string,
                            @Param('catid') catid:string):Promise<any>{
        console.log(catid)
        return this.userService.getuserlessonstat(userid,catid)
    }

    //**************************** POST ******************************/
    @Post('checkpassword/:userid')
    async checkpassword(@Param('userid') userid: string,
                        @Body ('User_password') User_password: string): Promise<any>{
        return this.userService.checkpassword(userid,User_password);
    }

    @Post(':userid/userlessonstat')
    async createuserlessonstat(@Param('userid') userid:string):Promise<any>{
        return this.userService.createuserlessonstat(userid);
    }

    //**************************** PATCH ******************************/
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

    @Patch(':userid/confirmemail')
    async confirmEmail(@Param('userid') userid:string):Promise<any>{
        return this.userService.confirmEmail(userid);
    }

    @Patch(':userid/updatelessonstat')
    async updatelessonstat(@Param('userid') userid:string,
                            @Body('catid') catid:string,
                            @Body('lessonid') lessonid:string,
                            @Body('score') score:number):Promise<any>{
        return this.userService.updatelessonstat(userid,catid,lessonid,score)
    }

    @Patch(':userid/getuserscore')
    async getuserscore(@Param('userid') userid:string):Promise<any>{
        return this.userService.getuserscore(userid)
    }
//======================== END-Update-And-Create-User-Stat ====================================


//==================================== Get-Dashboard ====================================
    @Get('dashboard')
    async getdashboard():Promise<any>{
        return this.userService.getdashboard()
    }
//==================================== END-Get-Dashboard ====================================


//==================================== Check-isQuiz ====================================
    @Get('isquizandscore/:userid/:catid/:lessonid')
    async getisquiz(@Param('userid') userid:string,
                    @Param('catid') catid:string,
                    @Param('lessonid') lessonid:string):Promise<any>{
        return this.userService.getisquiz(userid,catid,lessonid)
    }
//================================== END-Check-isQuiz ====================================
}
