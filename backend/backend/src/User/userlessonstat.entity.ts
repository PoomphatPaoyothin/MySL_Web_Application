import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class userlessonstat{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    ID: string;

    @Column()
    UserID: string;

    @Column()
    CategoryID: string;

    @Column()
    Lesson_amount: number;

    @Column()
    Lesson_learned: number;

    @Column()
    cat_user_score: number;

    @Column()
    cat_score: number;
}