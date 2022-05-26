import { Body, Controller, Get, Post, UseGuards ,Request} from "@nestjs/common";
import { loginService } from "./login.service";
import { UserInput } from "./user.input";

@Controller('login')
export class loginController{
    constructor(
        private loginService:loginService
    ){}

//login with email and password
    @Post()
    login(
        @Body() userInput: UserInput,
        @Request() req){
        return this.loginService.login(userInput);
    }
}