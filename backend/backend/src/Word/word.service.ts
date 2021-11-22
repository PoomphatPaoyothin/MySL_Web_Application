import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { word } from "./word.entity";

@Injectable()
export class WordService{
    constructor(
        @InjectRepository(word) 
        private wordRepository: Repository<word>,
    ){}

    async findAllWord(): Promise<word[]>{
        return this.wordRepository.find();
    }
}