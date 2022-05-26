import { Body, ConflictException, Controller, Param, Patch, Post, UnauthorizedException } from "@nestjs/common";
import { EmailConfirmationService } from "./emailConfirm.service";
import { registerService } from "./register.service";

@Controller('register')
export class RegisterController{
    constructor(
        private registerService: registerService,
        private readonly emailConfirmationService: EmailConfirmationService,
    ){}

//================================= CREATE-USER =======================================
    //****************************** FIRST-STEP ******************************
    //(user-email,password)
    @Post('first/emailpassword')
    async CreateAccount(
        @Body() RegisterInput: any,
        ): Promise<any>{
        let num = Math.floor((Math.random() * 9000) + 1000);
        const checkuseremail = await this.registerService.findUserByEmail(RegisterInput.User_email);
        if(!checkuseremail){
            await this.emailConfirmationService.sendVerificationLink(RegisterInput.User_email,num)
            return this.registerService.createAccountFirst(RegisterInput,num);
        }
        else{
            throw new ConflictException('email already exist');
        }
    }

    //****************************** SECOND-STEP ****************************** 
    //(user-firstname,lastname,upload profile picture)
    @Patch('second/:userid')
    async sendemail(@Param('userid') userid:string,
                    @Body() RegisterInput: any):Promise<any>{
        return this.registerService.createAccountSecond(userid,RegisterInput);
    }

    //****************************** CHECK-OTP ****************************** 
    @Patch(':userid/checkotp')
    async checkotp(@Param('userid') userid:string,
                    @Body('otp') otp:string): Promise<any>{
        return this.registerService.checkotp(userid,otp);
    }

    @Patch('/checkOTPwithemail')
    async checkwithemail(@Body('email') email:string,
                        @Body('otp') otp:string): Promise<any>{
        return this.registerService.checkotpwithemail(email,otp)
    }

    //****************************** SEND-OTP ******************************/ 
    // send otp if user forgot password
    @Patch('forgotpass')
    async forgotpassfirst(@Body('email') email:string):Promise<any>{
        let num = Math.floor((Math.random() * 9000) + 1000);
        const checkuseremail = await this.registerService.findUserByEmail(email);
        if(checkuseremail){
            await this.emailConfirmationService.sendConfirmPassword(email,num);
            return this.registerService.updateotp(email,num);
        }
        else{
            return false;
        }
    }
    //change user password
    @Patch('/changeforgotpass')
    async changeforgotpass(@Body('email') email:string,
                            @Body('password') password:string): Promise<any>{
        return this.registerService.changeforgotpassword(email,password);
    }

    //resend otp
    @Patch('/resendotp/:userid')
    async resendotp(@Param('userid') userid:string):Promise<any>{
        const getUser = await this.registerService.findUserProfile(userid);
        if(!getUser){
            throw new UnauthorizedException('cant find user');
        }
        let num = Math.floor((Math.random() * 9000) + 1000);
        const emailuser = getUser.User_email;
        await this.emailConfirmationService.sendVerificationLink(emailuser,num);
        return this.registerService.updateotp(emailuser,num);
    }
//================================= END-CREATE-USER =======================================
}