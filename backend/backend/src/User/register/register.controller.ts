import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import { EmailConfirmationService } from "./emailConfirm.service";
import { registerService } from "./register.service";

@Controller('register')
export class RegisterController{
    constructor(
        private registerService: registerService,
        private readonly emailConfirmationService: EmailConfirmationService,
    ){}

    @Post('first/emailpassword')
    async CreateAccount(
        @Body() RegisterInput: any,
        ): Promise<object>{
        let num = Math.floor((Math.random() * 9999) + 1);
        await this.emailConfirmationService.sendVerificationLink(RegisterInput.User_email,num)
        return this.registerService.createAccountFirst(RegisterInput,num);
    }

    @Patch('second/:userid')
    async sendemail(@Param('userid') userid:string,
                    @Body() RegisterInput: any):Promise<any>{
        return this.registerService.createAccountSecond(userid,RegisterInput);
    }

    @Post(':userid/forgotpassword')
    async forgotpassword(@Param('userid') userid:string): Promise<any>{
        const getUser = await this.registerService.findUserProfile(userid);
        const useremail = getUser.User_email;
        let num = Math.floor((Math.random() * 9999) + 1);
        await this.emailConfirmationService.sendConfirmPassword(useremail,num);
        return num;
    }
}