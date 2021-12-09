import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

const salt = 'asdfjkl';

@Entity()
export class User{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    ID: string;

    @Column()
    User_prefix_name:string;

    @Column()
    User_name:string;

    @Column()
    User_surname:string;

    @Column()
    User_email:string;

    @Column()
    User_password: string;

    @Column()
    follower_amount: number;

    @Column()
    following_amount: number;

    @Column()
    Is_delete: boolean;

    @Column()
    Is_email_confirm: boolean;

    @Column()
    imguser: string;

    @Column()
    register_stat: string;

    @Column()
    temp: string;

    @Column()
    timeupdate: Date;

}