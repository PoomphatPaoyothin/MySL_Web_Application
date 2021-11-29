import { Body, Controller, Post } from "@nestjs/common";
import { registerService } from "./register.service";

@Controller('register')
export class RegisterController{
    constructor(
        private registerService: registerService
    ){}

    @Post()
    CreateAccount(
        @Body() RegisterInput: any,
    ): Promise<object>{
        return this.registerService.createAccount(RegisterInput);
    }
}