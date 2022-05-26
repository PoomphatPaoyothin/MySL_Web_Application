import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getMongoRepository, Like, Repository,Raw } from "typeorm";
import { wordcategory } from "./category.entity";
import { lesson } from "./lesson.entity";
import { word } from "./word.entity";

@Injectable()
export class WordService{
    constructor(
        @InjectRepository(word) 
        private wordRepository: Repository<word>,
        @InjectRepository(wordcategory)
        private categoryRepository: Repository<wordcategory>,
        @InjectRepository(lesson)
        private lessonRepository: Repository<lesson>,
    ){}

    //get all word
    async findAllWord(): Promise<word[]>{
        return this.wordRepository.find();
    }

    //get all category
    async findAllCategory(): Promise<wordcategory[]>{
        return this.categoryRepository.find({order:{_id:"ASC"}});
    }

    //get category by id
    async getOneCategory(id:string): Promise<wordcategory>{
        return this.categoryRepository.findOne({where:{ID:id}});
    }

    //get lesson by category id
    async getLessonByCatID(id:string): Promise<lesson[]>{
        return this.lessonRepository.find({where:{Category_ID:id}});
    }

    //get word by category id
    //sort by ASC
    async getAllWordByCat(id:string): Promise<word[]>{
        const findthis = this.wordRepository.find({where:{Category_ID:id},order:{Lesson_ID:"ASC",_id:"ASC"}});
        return findthis;
    }

    //get word by word
    async getWordByWord(Word:string): Promise<any>{
        var getmongo = await this.wordRepository.findOne({
            where:{Word_name:Word}
        })

        if(!getmongo){
            return false
        }
        else{
            return getmongo;
        }
    }
}