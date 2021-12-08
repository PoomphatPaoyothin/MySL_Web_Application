import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { wordcategory } from 'src/Word/category.entity';
import { User } from '../user.entity';
import { usercatstat } from '../usercatstat.entity';
import { userfollower } from '../userfollower.entity';
import { userfollowing } from '../userfollowing.entity';
import { userlessoncheckpoint } from '../userlessoncheckpoint.entity';
import { userlessonstat } from '../userlessonstat.entity';
import { userstatnav } from '../userstatnav.entity';
import EmailService from './email.service';
import { EmailConfirmationService } from './emailConfirm.service';
import { registerService } from './register.service';
import { RegisterController } from './register.controller';
 
@Module({
    imports:[
        JwtModule.register({
            secret:'asdjfkl'
        }),
        TypeOrmModule.forFeature([
            User,
            usercatstat,
            userstatnav,
            userlessoncheckpoint,
            userlessonstat,
            userfollower,
            userfollowing,
            wordcategory,
        ]),
    ],
  controllers: [RegisterController],
    providers: [registerService,EmailConfirmationService,ConfigService,EmailService],
  exports: [registerService]
})
export class RegisterModule {}