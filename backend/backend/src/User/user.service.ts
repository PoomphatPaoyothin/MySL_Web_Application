import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./User_entity/user.entity";
import { usercatstat } from "./User_entity/usercatstat.entity";
import { userstatnav } from "./User_entity/userstatnav.entity";
import * as bcrypt from 'bcrypt';
import { userlessoncheckpoint } from "./User_entity/userlessoncheckpoint.entity";
import { userlessonstat } from ".//User_entity/userlessonstat.entity";
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
    ){}

    //get user by user email
    async findUserEmail(useremail:string){
        return this.userRepo.findOne({where:{User_email:useremail}});
    }

    //get user by user id
    async findUserProfile(id:string) {
        return this.userRepo.findOne({where:{ID:id,Is_delete:false}});
    }

    //get user stat category by category id
    async getUserStatCat(id:string,catid:string){
        return this.usercatstatRepo.findOne({where:{UserID:id, CategoryID:catid}});
    }

    //get user all stat category (show on profile)
    async getUserAllStatCat(id:string){
        return this.usercatstatRepo.find({where:{UserID:id}});
    }

    //get user stat on navbar
    async getUserStatNav(id:string){
        return this.userstatnavRepo.findOne({where:{UserID:id}});
    }

    //hash password function
    private async hashpassword(password: string,saltRound: number): Promise<string>{
        return bcrypt.hash(password,saltRound);
    }

    //update password user
    async updateUserPassword(id:string,password:string){
        // console.log(password)
        const getUser = await this.findUserProfile(id);
        // console.log(getUser)
        const saltRound = 12;
        // Hash password for security
        getUser.User_password = await this.hashpassword(password,saltRound);
        await this.userRepo.save(getUser);
        return getUser;
    }

    //update user name(prefix,username,usersurname)
    async updateUserName(id:string,User_prefix_name:string,User_name:string,User_surname:string){
        const getUser = await this.findUserProfile(id);
        getUser.User_prefix_name = User_prefix_name;
        getUser.User_name = User_name;
        getUser.User_surname = User_surname;
        await this.userRepo.save(getUser);
        return getUser;
    }

    //delete account (isdelete = true)
    async deleteAccount(id:string){
        const getUser = await this.findUserProfile(id);
        getUser.Is_delete = true;
        await this.userRepo.save(getUser);
        return getUser;
    }

    //update navbar lesson learned
    async updateNavbarLesson(id:string){
        const getUser = await this.getUserStatNav(id);
        var lessonStat = getUser.Lesson_Stat;
        getUser.Lesson_Stat = lessonStat+1;
        await this.userstatnavRepo.save(getUser);
        return getUser;
    }

    //update navbar quiz
    async updateNavbarQuiz(id:string,score:number){
        const getUser = await this.getUserStatNav(id);
        var quizStat = getUser.Quiz_stat;
        getUser.Quiz_stat = quizStat+score
        await this.userstatnavRepo.save(getUser)
        return getUser;
    }

    //update user stat category
    async updateUserStatCat(id:string,catid:string,score:number){
        const getUser = await this.getUserStatCat(id,catid);
        getUser.category_quiz_score = score;
        await this.usercatstatRepo.save(getUser);
        return getUser;
    }

    //get user all lesson stat
    async getUserAllLessonStat(id:string){
        return await this.userlessonstatRepo.find({where:{UserID:id}})
    }

    //get user checkpoint (check if learn)
    async getUsercheckpoint(id:string){
        return await this.userlessonStatCheckpointRepo.find({where:{UserID:id}})
    }

   //check password return true or false (bcrypt compare)
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

    //check if user confirm otp
    async confirmEmail(id:string){
        const getUser = await this.userRepo.findOne({where:{ID:id}});
        if(!getUser){
            throw new UnauthorizedException('cant find user');
        }
        getUser.Is_email_confirm = true;
        await this.userRepo.save(getUser);
        return getUser;
    }

    //change user password
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

    //change user password require email user
    async changeforgotpassword(email:string,password:string){
        const getUser = await this.userRepo.findOne({where:{User_email:email}})
        if(!getUser){
            throw new UnauthorizedException('cant find user');
        }
        const saltRound = 12;
        const new_password = await this.hashpassword(password,saltRound)
        getUser.User_password = new_password;
        await this.userRepo.save(getUser);
        return getUser;
    }

    //create user lesson stat (create when done register)
    async createuserlessonstat(id:string){
        var getUser = await this.findUserProfile(id);
        
        if(!getUser){
            throw new UnauthorizedException('cant find user');
        }

        for(let i = 1;i<6;i++){
            const catid = i.toString();
            const userlessonstat = this.userlessonstatRepo.create({
                ID: uuid(),
                UserID: id,
                CategoryID: catid,
                Lesson_amount: 3,
                Lesson_learned: 0,
                cat_user_score:0,
                cat_score:9,
            })

            for(let j = 1;j<4;j++){
                const lessonid = j.toString();
                const lessoncheckpoint = this.userlessonStatCheckpointRepo.create({
                    ID: uuid(),
                    UserID:id,
                    CategoryID:catid,
                    LessonID:lessonid,
                    Lesson_score:0,
                    Is_lesson_quiz:false
                })

                await this.userlessonStatCheckpointRepo.save(lessoncheckpoint)
            }

            await this.userlessonstatRepo.save(userlessonstat);
        }

        
        const userstatnav = this.userstatnavRepo.create({
            ID: uuid(),
            UserID: id,
            Lesson_Stat: 0,
            Quiz_stat: 0
        })
        await this.userstatnavRepo.save(userstatnav);

        return {"UserId":id};
    }

    //update user lesson stat
    async updatelessonstat(userid:string,catid:string,lessonid:string,score:number){
        catid = catid.toString();
        lessonid = lessonid.toString();
        var getlessonstat = await this.userlessonStatCheckpointRepo.findOne({where:{
            UserID:userid,LessonID:lessonid,CategoryID:catid
        }})

        if(getlessonstat){
            getlessonstat.Is_lesson_quiz = true;
            getlessonstat.Lesson_score = score;
            await this.userlessonStatCheckpointRepo.save(getlessonstat);
        }

        var userscore = await this.getuserscore(userid);
        var userlessonlearn = await this.getuserlessonlearn(userid);
        await this.updatecatscore(userid,catid);

        console.log(typeof userscore)

        var getuserstatnav = await this.userstatnavRepo.findOne({where:{
            UserID:userid
        }})
        console.log(getuserstatnav)

        if(getuserstatnav){
            getuserstatnav.Quiz_stat = userscore;
            getuserstatnav.Lesson_Stat = userlessonlearn;
            await this.userstatnavRepo.save(getuserstatnav);
            return getuserstatnav
        }

        else{
            return false
        }
    }

    // updadte user category score
    async updatecatscore(userid:string,catid:string){
        var score = 0;
        var is_learn = 0;
        var getusercatquiz = await this.userlessonstatRepo.findOne({where:{
            UserID:userid,CategoryID:catid
        }})
        var getuserlessoncheckpoint = await this.userlessonStatCheckpointRepo.find({
            where:{
                UserID:userid,
                CategoryID:catid,
            }
        })
        
        if(!getusercatquiz){
            return false
        }
        else{
            for(let i in getuserlessoncheckpoint){
                let LessonScore = getuserlessoncheckpoint[i].Lesson_score;
                let isLearn = getuserlessoncheckpoint[i].Is_lesson_quiz;
                score = score + LessonScore;
                if(isLearn == true){
                    is_learn = is_learn + 1;
                }
            }
            getusercatquiz.cat_user_score = score;
            getusercatquiz.Lesson_learned = is_learn;
            await this.userlessonstatRepo.save(getusercatquiz);
        }
    }

    //get user lesson stat
    async getuserlessonstat(userid:string,catid:string){
        console.log(typeof catid)
        var getuserlessonstat = await this.userlessonStatCheckpointRepo.find({
            where:{
                UserID:userid,
                CategoryID:catid
            }
        })

        if(getuserlessonstat){
            return getuserlessonstat;
        }
        else{
            return false;
        }
    }

    //get user score
    async getuserscore(userid:string){
        var res = 0;
        var getuserscore = await this.userlessonStatCheckpointRepo.find({
            where:{
                UserID:userid
            }
        })
        for(let i in getuserscore){
            let k = getuserscore[i]
            res = res + getuserscore[i].Lesson_score;
        }
        return res;
    }

    //get user lesson learn
    async getuserlessonlearn(userid:string){
        var res = 0;
        var getuserlessonlearn = await this.userlessonStatCheckpointRepo.find({
            where:{
                UserID:userid
            }
        })

        for(let i in getuserlessonlearn){
            let k = getuserlessonlearn[i]
            if(k.Is_lesson_quiz == true){
                res = res + 1;
            }
        }
        return res;
    }

    //get dashboard
    async getdashboard(){
        var dashboard = await this.userstatnavRepo.find({order:{Quiz_stat:"DESC"}});
        var getuser_ava = await this.userRepo.find({where:{Is_delete:false}});
        var return_dashboard = [];
        var arr_user = [];

        type User_ = {
            userid: string;
            name:string;
        }

        type return_ = {
            name:string;
            rank:number;
            userid:string;
            score:number;
        }

        for(let i in getuser_ava){
            var username = getuser_ava[i].User_prefix_name + " " + getuser_ava[i].User_name + " " + getuser_ava[i].User_surname;
            var userid = getuser_ava[i].ID;
            
            if(userid !== undefined && username !== undefined){
                var usr = {} as User_;
                usr.userid = userid;
                usr.name = username;
                
                arr_user.push(usr)
            }
        }

        for(let j in dashboard){
            for(let k in arr_user){
                if(dashboard[j].UserID == arr_user[k].userid){
                    
                    var return_obj = {} as return_;
                    return_obj.name = arr_user[k].name
                    return_obj.score = dashboard[j].Quiz_stat;
                    return_obj.userid = arr_user[k].userid
                    return_dashboard.push(return_obj)
                }
            }
        }

        //return only top 15
        let return_15 = return_dashboard.slice(0,15);
        let number = 1;

        for(let l in return_15){
            if(number<16){
                return_15[l].rank = number;
                number=number+1;
            }
        }

        return return_15;
    }

    //get all user that is_delete=false
    async findalluser(){
        return this.userRepo.find({where:{Is_delete:false}});
    }

    //get user isQuiz
    async getisquiz(userid:string,catid:string,lessonid:string){
        var getidquiz = await this.userlessonStatCheckpointRepo.findOne({where:{
            UserID:userid,
            CategoryID:catid,
            LessonID:lessonid
        }})

        if(!getidquiz){
            return false
        }

        return {"score": getidquiz.Lesson_score,"is_quiz":getidquiz.Is_lesson_quiz}
    }

    //get user navbar stat
    async getusernavbarstat(userid:string){
        var getusernavbarstat = await this.userstatnavRepo.findOne({where:{
            UserID:userid
            }
        })
        if(!getusernavbarstat){
            return false
        }
        else{
            return getusernavbarstat;
        }
    }

    //get user categoty stat
    async getusercatstat(userid:string,catid:string){
        var getusercatstat = await this.userlessonstatRepo.findOne({where:{
            UserID:userid,CategoryID:catid
            }
        })
        if(!getusercatstat){
            return false
        }
        else{
            return getusercatstat;
        }
    }

    //update user picture url
    async updateuserpicture(userid:string){
        var getuser = await this.userRepo.findOne({where:{
            ID:userid
        }})
        if(!getuser){
            return false
        }
        
        getuser.imguser = userid;
        await this.userRepo.save(getuser)
        return getuser;
    }
}