import React, { useEffect, useState } from "react";
import './Profile.css';
import Statbox from "./Statbox";
import ProfileService from "./ProfileService";
import {StatInfo, wordInfo} from './InterfaceProfile'

const Stat=(props:any)=>{
    const [objstat,setObjstat] = useState<any[]>()
    const [objcatstat,setObjcatstat] = useState<StatInfo[]>()
    const [obj,setObj] = useState<wordInfo[]>()


    const fetchLessonStat=()=>{
        return(
            ProfileService.fetchLessonStat(props.id)
            .then(res=>{
                console.log('resss is',res)
                setObjstat(res);
            })
        )
    }


    const fetchWordCategory=()=>{
        return(
            ProfileService.fetchWordCategory()
            .then(res=>{
                setObj(res);
            })
        )
    }

    const fetchCategoryStat=()=>{
        return(
            ProfileService.fetchCategoryStat(props.id)
            .then(res=>{
                setObjcatstat(res);
            })
        )
    }

    const findvalue = (id:string) =>{
        if(obj !== undefined)
        {
            let size = obj?.length;
            for(let i=0;i<size;i++){

                if(obj[i].ID == id){
                    return(obj[i].Category_name)
                }
            }
        }
    }

    const findquizscore = (id:string) =>{
        if(objcatstat !== undefined)
        {
            let size = objcatstat?.length;
            for(let i=0;i<size;i++){
                if(objcatstat[i].CategoryID == id){
                    return(objcatstat[i].category_quiz_score)
                }
            }
        }
    }


    useEffect(()=>{
        fetchLessonStat()
        fetchWordCategory()
        fetchCategoryStat()
    },[])

    console.log('ssssssssssssssssss', objstat)
    return(
        <div className='statBG'>
            <div className="vl">
            </div>
            <div className='multimiddlee'>
                {console.log('asasa',objstat)}
                {objstat?.map((obj)=> (<Statbox name={findvalue(obj.CategoryID)}  Lesson_amount={obj.Lesson_amount} Lesson_learned={obj.Lesson_learned} cat_user_score={obj.cat_user_score} cat_score={obj.cat_score} category_quiz_score={findquizscore(obj.CategoryID)}/>))} 
            </div>
        </div>
    )
}

export default Stat