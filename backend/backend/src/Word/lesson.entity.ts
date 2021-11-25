import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { ObjectID } from "mongodb";

@Entity()
export class lesson{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    ID: string;

    @Column()
    LessonName: string;

    @Column()
    Category_ID: string;

    @Column()
    Word_amount: number;
}