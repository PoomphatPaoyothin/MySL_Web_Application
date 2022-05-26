import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class userstatnav{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    ID: string;
    
    @Column()
    UserID:string;
    
    @Column()
    Lesson_Stat:number;

    @Column()
    Quiz_stat:number;
}