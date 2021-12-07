import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class wordcategory{
    @ObjectIdColumn()
    _id: string;

    @Column()
    ID: string;

    @Column()
    Category_name: string;

    @Column()
    Lesson_amount: number;

    @Column()
    Word_amount: number;

    @Column()
    Word_picture: string;

    @Column()
    First_word: string;
}