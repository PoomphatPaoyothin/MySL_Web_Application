import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { wordcategory } from 'src/Word/category.entity';
import { User } from '../User_entity/user.entity';
import { usercatstat } from '../User_entity/usercatstat.entity';
import { userlessoncheckpoint } from '../User_entity/userlessoncheckpoint.entity';
import { userlessonstat } from '../User_entity/userlessonstat.entity';
import { userstatnav } from '../User_entity/userstatnav.entity';
import EmailService from './email.service';
import { EmailConfirmationService } from './emailConfirm.service';
import { registerService } from './register.service';
import { RegisterController } from './register.controller';

require('dotenv').config()
 
@Module({
    imports:[
        JwtModule.register({
            secret:process.env.SECRET_KEY
        }),
        TypeOrmModule.forFeature([
            User,
            usercatstat,
            userstatnav,
            userlessoncheckpoint,
            userlessonstat,
            wordcategory,
        ]),
    ],
  controllers: [RegisterController],
    providers: [registerService,EmailConfirmationService,ConfigService,EmailService],
  exports: [registerService]
})
export class RegisterModule {}