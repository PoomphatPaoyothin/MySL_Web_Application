import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { ObjectID } from "mongodb";

@Entity()
export class word{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    ID: string;

    @Column()
    Category_ID: string;

    @Column()
    Lesson_ID: string;

    @Column()
    Word_name: string;

    @Column()
    Word_Video: string;
}