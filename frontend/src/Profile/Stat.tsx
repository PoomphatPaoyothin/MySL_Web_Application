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
                    console.log('cat name = ', obj[i].Category_name)
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
                    console.log('aaa = ',objcatstat[i].CategoryID)
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


    return(
        <div className='statBG'>
            <div className='multimiddle'>
                {objstat?.map((obj)=> (<Statbox name={findvalue(obj.CategoryID)}  Lesson_amount={obj.Lesson_amount} Lesson_learned={obj.Lesson_learned} category_quiz_score={findquizscore(obj.CategoryID)}/>))} 
            </div>
        </div>
    )
}

export default Stat