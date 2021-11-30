export interface StatInfo{
    _id?:string;
    ID:string;
    UserID:string;
    CategoryID:string;
    Is_category_quiz:boolean;
    category_quiz_score:number;
}

export interface wordInfo{
    _id?:string;
    ID:string;
    Category_name:string;
    Lesson_amount:number;
    Word_amount:number;
    Word_picture:string;
}

export interface userInfo{
    _id?:string;
    ID:string;
    User_prefix_name:string;
    User_name:string;
    User_surname:string;
    User_email:string;
    User_password:string;
    follower_amount:number;
    following_amount:number;
    Is_delete:boolean;
}