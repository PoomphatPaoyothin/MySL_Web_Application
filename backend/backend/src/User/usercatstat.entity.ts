import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class usercatstat{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    ID: string;

    @Column()
    UserID: string;

    @Column()
    CategoryID: string;

    @Column()
    Is_category_quiz: boolean;

    @Column()
    category_quiz_score: number;
}