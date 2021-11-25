import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { wordcategory } from "./category.entity";
import { word } from "./word.entity";

@Injectable()
export class WordService{
    constructor(
        @InjectRepository(word) 
        private wordRepository: Repository<word>,
        @InjectRepository(wordcategory)
        private categoryRepository: Repository<wordcategory>,
    ){}

    async findAllWord(): Promise<word[]>{
        return this.wordRepository.find();
    }

    async findAllCategory(): Promise<wordcategory[]>{
        return this.categoryRepository.find();
    }

    async getOneCategory(id:string): Promise<wordcategory>{
        return this.categoryRepository.findOne({where:{ID:id}});
    }
}