import { Module } from '@nestjs/common';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { word } from './Word/word.entity';
import { WordModule } from './Word/word.module';
import { WordController } from './Word/word.controller';
import { WordService } from './Word/word.service';
import { AuthModule } from './auth/auth.module';
import { User } from './User/user.entity';
import { loginModule } from './User/login/login.module';
import { UserModule } from './User/user.module';
import { wordcategory } from './Word/category.entity';
import { lesson } from './Word/lesson.entity';
import { usercatstat } from './User/User_entity/usercatstat.entity';
import { userstatnav } from './User/userstatnav.entity';
import { userlessoncheckpoint } from './User/userlessoncheckpoint.entity';
import { userlessonstat } from './User/userlessonstat.entity';
import { userfollower } from './User/userfollower.entity';
import { userfollowing } from './User/userfollowing.entity';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
// import { EmailModule } from './User/register/email.module';
import { JwtModule } from '@nestjs/jwt';
import { RegisterModule } from './User/register/register.module';
import { MulterModule } from '@nestjs/platform-express';
import {diskStorage} from 'multer'

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://MySL_DataBase:z8b3Pd1RFarnagc7@cluster0.tjniv.mongodb.net/MySL',
      entities: [
        word,
        User,
        wordcategory,
        lesson,
        usercatstat,
        userstatnav,
        userlessoncheckpoint,
        userlessonstat,
        userfollower,
        userfollowing,
      ]
    }),
    WordModule,
    loginModule,
    UserModule,
    RegisterModule,
  ],

  controllers:[],
  providers:[],
})
export class AppModule {}
