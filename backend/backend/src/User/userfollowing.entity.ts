import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class userfollowing{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    ID: string;

    @Column()
    UserID: string;

    @Column()
    UserName: string;

    @Column()
    User_followingID:string;

    @Column()
    UserFollowingName: string;

    @Column()
    is_following:boolean;
}