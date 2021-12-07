import { Body, Controller, Post } from "@nestjs/common";
import { EmailConfirmationService } from "./emailConfirm.service";
import { registerService } from "./register.service";

@Controller('register')
export class RegisterController{
    constructor(
        private registerService: registerService,
        private readonly emailConfirmationService: EmailConfirmationService,
    ){}

    @Post()
    CreateAccount(
        @Body() RegisterInput: any,
    ): Promise<object>{
        return this.registerService.createAccount(RegisterInput);
    }

    @Post('test')
    async testemail(@Body() RegisterInput: any):Promise<any>{
        const user = await this.registerService.createAccount(RegisterInput);
        await this.emailConfirmationService.sendVerificationLink(RegisterInput.User_email)
        return user;
    }
}