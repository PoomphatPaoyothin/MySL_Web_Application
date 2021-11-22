import { Controller, Get } from "@nestjs/common";
import { word } from "./word.entity";
import { WordService } from "./word.service";

@Controller('word')
export class WordController{
    constructor(private wordService:WordService){}

    @Get()
    async findAllWord(): Promise<word[]>{
        console.log(this.wordService.findAllWord())
        return this.wordService.findAllWord();
    }
}