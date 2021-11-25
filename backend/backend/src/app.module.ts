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
import { usercatstat } from './User/usercatstat.entity';
@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://MySL_DataBase:z8b3Pd1RFarnagc7@cluster0.tjniv.mongodb.net/MySL',
      entities: [word,User,wordcategory,lesson,usercatstat]
    }),
    WordModule,
    loginModule,
    UserModule,
  ],

  controllers:[],
  providers:[],
})
export class AppModule {}
