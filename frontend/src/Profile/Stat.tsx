import React, { useEffect, useState } from "react";
import './Profile.css';
import Statbox from "./Statbox";
import ProfileService from "./ProfileService";
import {StatInfo, wordInfo} from './InterfaceProfile'

const Stat=(props:any)=>{
    const [statobj,setStatobj] = useState<StatInfo[]>();
    const [Wordcategory,setWordcategory] = useState<wordInfo[]>()
    const [count,setCount] = useState<number>(0);

    const fetchNameLesson=()=>{
        return(
            ProfileService.fetchNameLesson(props.id)
            .then(res=>{
                setStatobj(res);

            })
        )
    }

    const fetchWordCategory=()=>{
        return(
            ProfileService.fetchWordCategory()
            .then(res=>{
                setWordcategory(res);
            })
        )
    }

    const counChapter=() =>{
        {statobj?.map((obj)=> (obj.Is_category_quiz? console.log(count): console.log(count)))} 
        
    }

    useEffect(()=>{
        fetchNameLesson()
        fetchWordCategory()
        counChapter()
    },[])


    return(
        <div className='statBG'>
            <div className='multimiddle'>
                {Wordcategory?.map((obj)=> (<Statbox name={obj.Category_name} image={obj.Word_picture} learnedChapter={count}/>))} 

            </div>


        </div>
    )
}

export default Stat