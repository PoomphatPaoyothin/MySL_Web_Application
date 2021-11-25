import { Controller, Get, Param } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";

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

    
}
