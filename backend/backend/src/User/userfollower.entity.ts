import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class userfollower{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    ID: string;

    @Column()
    UserID: string;

    @Column()
    UserName : string;

    @Column()
    User_followerID:string;

    @Column()
    UserFollowerName:string;

    @Column()
    is_follower: boolean;
}