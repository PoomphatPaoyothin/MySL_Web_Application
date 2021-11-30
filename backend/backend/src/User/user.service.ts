import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { usercatstat } from "./usercatstat.entity";
import { userstatnav } from "./userstatnav.entity";
import * as bcrypt from 'bcrypt';
import { userlessoncheckpoint } from "./userlessoncheckpoint.entity";
import { userlessonstat } from "./userlessonstat.entity";
import { userfollower } from "./userfollower.entity";
import { userfollowing } from "./userfollowing.entity";
import {v4 as uuid} from 'uuid';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepo : Repository<User>,
        @InjectRepository(usercatstat)
        private usercatstatRepo : Repository<usercatstat>,
        @InjectRepository(userstatnav)
        private userstatnavRepo: Repository<userstatnav>,
        @InjectRepository(userlessoncheckpoint)
        private userlessonStatCheckpointRepo: Repository<userlessoncheckpoint>,
        @InjectRepository(userlessonstat)
        private userlessonstatRepo : Repository<userlessonstat>,
        @InjectRepository(userfollower)
        private userfollowerRepo : Repository<userfollower>,
        @InjectRepository(userfollowing)
        private userfollowingRepo : Repository<userfollowing>
    ){}

    async findUserEmail(useremail:string){
        return this.userRepo.findOne({where:{User_email:useremail}});
    }
    
    async findUserProfile(id:string) {
        return this.userRepo.findOne({where:{ID:id}});
    }

    async getUserStatCat(id:string,catid:string){
        return this.usercatstatRepo.findOne({where:{UserID:id, CategoryID:catid}});
    }

    async getUserAllStatCat(id:string){
        return this.usercatstatRepo.find({where:{UserID:id}});
    }

    async getUserStatNav(id:string){
        return this.userstatnavRepo.findOne({where:{UserID:id}});
    }

    private async hashpassword(password: string,saltRound: number): Promise<string>{
        return bcrypt.hash(password,saltRound);
    }

    async updateUserPassword(password:string,id:string){
        const getUser = await this.findUserProfile(id);
        const saltRound = 12;
        getUser.User_password = await this.hashpassword(password,saltRound);
        await this.userRepo.save(getUser);
        return getUser;
    }

    async updateUserName(id:string,User_prefix_name:string,User_name:string,User_surname:string){
        const getUser = await this.findUserProfile(id);
        getUser.User_prefix_name = User_prefix_name;
        getUser.User_name = User_name;
        getUser.User_surname = User_surname;
        await this.userRepo.save(getUser);
        return getUser;
    }

    async deleteAccount(id:string){
        const getUser = await this.findUserProfile(id);
        getUser.Is_delete = true;
        await this.userRepo.save(getUser);
        return getUser;
    }

    async updateNavbarLesson(id:string){
        const getUser = await this.getUserStatNav(id);
        var lessonStat = getUser.Lesson_Stat;
        getUser.Lesson_Stat = lessonStat+1;
        await this.userstatnavRepo.save(getUser);
        return getUser;
    }

    async updateNavbarQuiz(id:string,score:number){
        const getUser = await this.getUserStatNav(id);
        var quizStat = getUser.Quiz_stat;
        getUser.Quiz_stat = quizStat+score
        await this.userstatnavRepo.save(getUser)
        return getUser;
    }

    async updateUserStatCat(id:string,catid:string,score:number){
        const getUser = await this.getUserStatCat(id,catid);
        getUser.category_quiz_score = score;
        await this.usercatstatRepo.save(getUser);
        return getUser;
    }

    async getUserAllLessonStat(id:string){
        return await this.userlessonstatRepo.find({where:{UserID:id}})
    }

    async getUsercheckpoint(id:string){
        return await this.userlessonStatCheckpointRepo.find({where:{UserID:id}})
    }

    async getUserFollower(id:string){
        return await this.userfollowerRepo.find({where:{UserID:id}})
    }

    async getUserFollowing(id:string){
        return await this.userfollowingRepo.find({where:{UserID:id}})
    }

    async getAmountFollower(id:string){
        const amountfollower = await this.getUserFollower(id);
        var count_amount = 0
        for (let i in amountfollower){
            count_amount = count_amount + 1;
        }
        return {"amount_follower":count_amount}
    }

    async getAmountFollowing(id:string){
        const amountfollowing = await this.getUserFollowing(id);
        var count_amount = 0;
        for (let i in amountfollowing){
            count_amount = count_amount + 1;
        }
        return {"amount_following": count_amount}
    }

    async updateFollowerAmount(id:string){
        var getUser = await this.findUserProfile(id);
        var followeramount  = getUser.follower_amount;
        getUser.follower_amount = followeramount + 1;
        await this.userRepo.save(getUser)
        return getUser;
    }

    async updateFollowingAmount(id:string){
        var getUser = await this.findUserProfile(id);
        var followingamount = getUser.following_amount;
        getUser.following_amount = followingamount + 1;
        await this.userRepo.save(getUser);
        return getUser;
    }

    async updateUNFollowerAmount(id:string){
        var getUser = await this.findUserProfile(id);
        var followeramount  = getUser.follower_amount;
        if(followeramount == 0){
            throw new UnauthorizedException('cant unfollower');
        }
        getUser.follower_amount = followeramount - 1;
        await this.userRepo.save(getUser)
        return getUser;
    }

    async updateUNFollowingAmount(id:string){
        var getUser = await this.findUserProfile(id);
        var followingamount = getUser.following_amount;
        if(followingamount == 0){
            throw new UnauthorizedException('cant unfollowing');
        }
        getUser.following_amount = followingamount - 1;
        await this.userRepo.save(getUser);
        return getUser;
    }

    async createfollower(id1:string,id2:string){
        const checkuser1 = await this.userRepo.findOne({where:{ID:id1}});
        const checkuser2 = await this.userRepo.findOne({where:{ID:id2}});
        if(!checkuser1 || !checkuser2){
            throw new UnauthorizedException('cant find user');
        }
        else{
            const follower = this.userfollowerRepo.create({
                ID: uuid(),
                UserID: id1,
                User_followerID:id2,
            })

            await this.userfollowerRepo.save(follower);
            return follower;
        }
    }

    async createfollowing(id1:string,id2:string){
        const checkuser1 = await this.userRepo.findOne({where:{ID:id1}});
        const checkuser2 = await this.userRepo.findOne({where:{ID:id2}});
        if(!checkuser1 || !checkuser2){
            throw new UnauthorizedException('cant find user');
        }
        else{
            const following = this.userfollowingRepo.create({
                ID: uuid(),
                UserID: id1,
                User_followingID:id2,
            })

            await this.userfollowingRepo.save(following);
            return following;
        }
    }
}