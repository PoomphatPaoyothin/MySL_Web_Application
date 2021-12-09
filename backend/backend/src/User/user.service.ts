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
import { wordcategory } from "src/Word/category.entity";
import { check } from "prettier";
import { range } from "rxjs";

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
        private userfollowingRepo : Repository<userfollowing>,
        @InjectRepository(wordcategory)
        private wordcatRepo: Repository<wordcategory>
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

    // async getCatById(id:string){
    //     return this.wordcatRepo.find({where:{ID:id}});
    // }

    async getUserStatNav(id:string){
        return this.userstatnavRepo.findOne({where:{UserID:id}});
    }

    private async hashpassword(password: string,saltRound: number): Promise<string>{
        return bcrypt.hash(password,saltRound);
    }

    async updateUserPassword(id:string,password:string){
        console.log(password)
        const getUser = await this.findUserProfile(id);
        console.log(getUser)
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
        return await this.userfollowerRepo.find({
            where:{
                UserID:id,
                is_follower:true,
            }})
    }

    async getUserFollowing(id:string){
        return await this.userfollowingRepo.find({
            where:{
                UserID:id,
                is_following:true,
        }})
    }

    async getAmountFollower(id:string){
        const amountfollower = await this.getUserFollower(id);
        var count_amount = 0;
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

        const checkexist = await this.userfollowerRepo.findOne({
            where:{
                UserID:id1,
                User_followerID:id2,
            }})

        if(checkexist){
            if(!checkexist.is_follower){
                checkexist.is_follower = true;
                await this.userfollowerRepo.save(checkexist);
                return checkexist;
            }
            else{
                throw new UnauthorizedException('already follow');
            }
        }

        const prefix1 = checkuser1.User_prefix_name;
        const prefix2 = checkuser2.User_prefix_name;
        const Name1 = checkuser1.User_name;
        const Name2 = checkuser2.User_name;
        const surname1 = checkuser1.User_surname;
        const surname2 = checkuser2.User_surname;

        const UserName1 = prefix1 + Name1 + " " + surname1;
        const UserName2 = prefix2 + Name2 + " " + surname2;

        console.log(UserName1);
        console.log(UserName2);

        if(!checkuser1 || !checkuser2){
            throw new UnauthorizedException('cant find user');
        }

        else{
            const follower = this.userfollowerRepo.create({
                ID: uuid(),
                UserID: id1,
                UserName: UserName1,
                User_followerID:id2,
                UserFollowerName: UserName2,
                is_follower: true,
            })

            await this.userfollowerRepo.save(follower);
            return follower;
        }
    }

    async createfollowing(id1:string,id2:string){
        const checkuser1 = await this.userRepo.findOne({where:{ID:id1}});
        const checkuser2 = await this.userRepo.findOne({where:{ID:id2}});

        const checkexist = await this.userfollowingRepo.findOne({
            where:{
                UserID:id1,
                User_followingID:id2,
            }})

        const prefix1 = checkuser1.User_prefix_name;
        const prefix2 = checkuser2.User_prefix_name;
        const Name1 = checkuser1.User_name;
        const Name2 = checkuser2.User_name;
        const surname1 = checkuser1.User_surname;
        const surname2 = checkuser2.User_surname;

        const UserName1 = prefix1 + Name1 + " " + surname1;
        const UserName2 = prefix2 + Name2 + " " + surname2;
    
        if(checkexist){
            if(!checkexist.is_following){
                checkexist.is_following = true;
                await this.userfollowingRepo.save(checkexist);
                return checkexist;
            }
            else{
                throw new UnauthorizedException('already follow');
            }
        }
    
        if(!checkuser1 || !checkuser2){
            throw new UnauthorizedException('cant find user');
        }
        else{
            const following = this.userfollowingRepo.create({
                ID: uuid(),
                UserID: id1,
                UserName:UserName1,
                User_followingID:id2,
                UserFollowingName:UserName2,
                is_following:true,
            })

            await this.userfollowingRepo.save(following);
            return following;
        }
    }

    async checkpassword(id:string,User_password:string){
        const getUser = await this.findUserProfile(id);
        const checkpass = bcrypt.compareSync(User_password,getUser.User_password);
        if(checkpass){
            return true
        }
        else{
            return false
        }
    }

    async updateUnfollower(id1:string,id2:string){
        const checkuser1 = await this.userRepo.findOne({where:{ID:id1}});
        const checkuser2 = await this.userRepo.findOne({where:{ID:id2}});

        const unfollower = await this.userfollowerRepo.findOne(
            {where:{
                UserID:id1,
                User_followerID:id2
            }}
        )

        if(!checkuser1 || !checkuser2){
            throw new UnauthorizedException('cant find user');
        }else if(unfollower && unfollower.is_follower == true){
            unfollower.is_follower = false;
            await this.userfollowerRepo.save(unfollower);
            return unfollower;
        }else{
            throw new UnauthorizedException('cant unfollower');
        }
    }

    async undateUnfollowing(id1:string,id2:string){
        const checkuser1 = await this.userRepo.findOne({where:{ID:id1}});
        const checkuser2 = await this.userRepo.findOne({where:{ID:id2}});

        const unfollowing = await this.userfollowingRepo.findOne(
            {where:{
                UserID:id1,
                User_followingID:id2
            }}
        )

        if(!checkuser1 || !checkuser2){
            throw new UnauthorizedException('cant find user');
        }else if(unfollowing && unfollowing.is_following == true){
            unfollowing.is_following = false;
            await this.userfollowingRepo.save(unfollowing);
            return unfollowing;
        }else{
            throw new UnauthorizedException('cant unfollower');
        }

    }

    async confirmEmail(id:string){
        const getUser = await this.userRepo.findOne({where:{ID:id}});
        if(!getUser){
            throw new UnauthorizedException('cant find user');
        }
        getUser.Is_email_confirm = true;
        await this.userRepo.save(getUser);
        return getUser;
    }

    async changepassword(id:string,password:string){
        const getUser = await this.userRepo.findOne({where:{ID:id}})
        if(!getUser){
            throw new UnauthorizedException('cant find user');
        }
        const saltRound = 12;
        const new_password = await this.hashpassword(password,saltRound)
        getUser.User_password = new_password;
        await this.userRepo.save(getUser);
        return getUser;
    }

    async createuserlessonstat(id:string){
        var getUser = await this.findUserProfile(id);
        if(!getUser){
            throw new UnauthorizedException('cant find user');
        }
        for(let i = 1;i<9;i++){
            const id_lesson = i.toString();
            const userlessonstat = this.userlessonstatRepo.create({
                ID: uuid,
                
            })
        }
    }
}