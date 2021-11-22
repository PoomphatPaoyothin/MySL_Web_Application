import { Controller, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WordController } from "./word.controller";
import { word } from "./word.entity";
import { WordService } from "./word.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([word]),
    ],
    providers:[
        WordService
    ],
    exports:[WordService],
    controllers:[WordController]
})

export class WordModule{}