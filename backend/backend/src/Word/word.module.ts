import { Controller, Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { wordcategory } from "./category.entity";
import { lesson } from "./lesson.entity";
import { WordController } from "./word.controller";
import { word } from "./word.entity";
import { WordService } from "./word.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([word,wordcategory,lesson]),
    ],
    providers:[
        WordService
    ],
    exports:[WordService],
    controllers:[WordController]
})

export class WordModule{}