import { Controller, Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { wordcategory } from "./category.entity";
import { lesson } from "./lesson.entity";
import { WordController } from "./word.controller";
import { word } from "./word.entity";
import { WordService } from "./word.service";
import {diskStorage} from 'multer'

@Module({
    imports:[
        TypeOrmModule.forFeature([word,wordcategory,lesson]),
        MulterModule.register({
            dest: './files'
        }),
        MulterModule.register({
            storage: diskStorage({
                destination: function (req,file,cb){
                    cb(null, './file')
                },
                filename: function (req,file,cb){
                    const uniqueSuffix = Date.now()+'-'+Math.round(Math.random()*1E9)
                    cb(null,file.fieldname+'-'+uniqueSuffix +'.mp4')
                }
            })
        })
    ],
    providers:[
        WordService
    ],
    exports:[WordService],
    controllers:[WordController]
})

export class WordModule{}