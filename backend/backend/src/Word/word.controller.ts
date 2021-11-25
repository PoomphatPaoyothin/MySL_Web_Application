import { Controller, Get, Param } from "@nestjs/common";
import { wordcategory } from "./category.entity";
import { lesson } from "./lesson.entity";
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

    @Get('category')
    async getCategory(): Promise<wordcategory[]>{
        return this.wordService.findAllCategory();
    }

    @Get('/category/:id')
    async getOneCategory(
        @Param('id') id:string
    ): Promise<wordcategory>{
        return this.wordService.getOneCategory(id);
    }

    @Get('/lesson/:idcat')
    async getLessonByCatID(@Param('idcat') idcat:string): Promise<lesson[]>{
        return this.wordService.getLessonByCatID(idcat);
    }

    @Get('/wordcat/:idcat')
    async getWordByCatID(@Param('idcat') idcat:string): Promise<word[]>{
        return this.wordService.getAllWordByCat(idcat);
    }
}