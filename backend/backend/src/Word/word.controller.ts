import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { wordcategory } from "./category.entity";
import { lesson } from "./lesson.entity";
import { word } from "./word.entity";
import { WordService } from "./word.service";
import {Express} from 'express'
import {diskStorage} from 'multer'

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

    @Get('/getword/:word')
    async getWordByWord(@Param('word') word:string): Promise<word[]>{
        return this.wordService.getWordByWord(word);
    }

    @Post('upload/:token')
    @UseInterceptors(FileInterceptor('file'))
    async uploadedFile(@Param('token') token:string,@UploadedFile() file:Express.Multer.File){
        const fs = require('fs')
        const folderName = `./files/${token}`
        try {
            if (!fs.existsSync(folderName)){
              fs.mkdirSync(folderName)
            }
          } catch (err) {
            console.error(err)
        }
        const response = {
            originalname: file.originalname,
            filename:file.filename
        }
        console.log(response)
        if(file){
            return response
        }
        else{
            return false
        }
    }
}