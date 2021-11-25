import { Controller, Get, Param } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{
    constructor(private userService:UserService ){}

    @Get('findemail/:useremail')
    async findUseremail(@Param('useremail') User_email: string):Promise<User>{
        return this.userService.findOneUser(User_email);
    }
    
}
