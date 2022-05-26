import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { wordcategory } from "./category.entity";
import { lesson } from "./lesson.entity";
import { word } from "./word.entity";
import { WordService } from "./word.service";
@Controller('word')
export class WordController{
    constructor(private wordService:WordService){}

    //**for check */
    //get all word
    @Get()
    async findAllWord(): Promise<word[]>{
        console.log(this.wordService.findAllWord())
        return this.wordService.findAllWord();
    }

    //**for check */
    //get all category
    @Get('category')
    async getCategory(): Promise<wordcategory[]>{
        return this.wordService.findAllCategory();
    }

    //get category by id
    @Get('/category/:id')
    async getOneCategory(
        @Param('id') id:string
    ): Promise<wordcategory>{
        return this.wordService.getOneCategory(id);
    }

    //get lesson by category id
    @Get('/lesson/:idcat')
    async getLessonByCatID(@Param('idcat') idcat:string): Promise<lesson[]>{
        return this.wordService.getLessonByCatID(idcat);
    }

    //get word by category id
    @Get('/wordcat/:idcat')
    async getWordByCatID(@Param('idcat') idcat:string): Promise<word[]>{
        return this.wordService.getAllWordByCat(idcat);
    }

    //get word by word
    @Get('/getword/:word')
    async getWordByWord(@Param('word') word:string): Promise<word[]>{
        return this.wordService.getWordByWord(word);
    }
}