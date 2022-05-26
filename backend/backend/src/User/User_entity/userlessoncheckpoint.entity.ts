import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class userlessoncheckpoint{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    ID: string;

    @Column()
    UserID: string;

    @Column()
    CategoryID: string;

    @Column()
    Is_lesson_quiz: boolean;

    @Column()
    LessonID: string;

    @Column()
    Lesson_score: number;
}