import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

const salt = bcrypt.genSalt();

@Entity()
export class User{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

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

    async validatePassword(User_password: string): Promise<boolean>{
        const hash = await bcrypt.hash(User_password,await salt);
        return hash === this.User_password;
    }

}