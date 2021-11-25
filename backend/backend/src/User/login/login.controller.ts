import { Body, Controller, Get, Post, UseGuards ,Request} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../user.entity";
import { LocalAuthGuard } from "./local-auth.guard";
import { loginService } from "./login.service";
import { UserInput } from "./user.input";

@Controller('login')
export class loginController{
    constructor(
        private loginService:loginService
    ){}

    @Post()
    login(
        @Body() userInput: UserInput,
        @Request() req){
        return this.loginService.login(userInput);
        // return this.loginService.login(userInput);
    }

    @Get('/getuserdata')
    @UseGuards(AuthGuard())
    getuserdata(user:User)
    {
        const res = this.loginService.getuserdata(user);
        return res;
    }
}