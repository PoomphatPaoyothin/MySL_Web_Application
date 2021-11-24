import { Entity } from "typeorm";
import { Field, InputType } from "@nestjs/graphql";
import { isDate,IsNotEmpty,IsString,IsEmail,MinLength } from "class-validator";

@InputType()
export class UserInput{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Field()
    User_email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Field()
    User_password: string;
}