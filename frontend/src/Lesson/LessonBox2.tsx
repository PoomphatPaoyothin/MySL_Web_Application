import React, { useEffect, useState } from "react";
import ChapterBox from "./ChapterBox";
import LessonService from "./LessonService";

const LessonBox=(props:any)=>{

    const [show, setShow] = useState<number>(0)
    const [objlesson, setObjlesson] = useState<any[]>()
    const [count, setCount] = useState<number>(0)

    const changeShow=(num:number)=>{
        setShow(num)
    }

    const fetchlesson=() =>{
        LessonService.fetchlesson(props.catId)
        .then( res=>{
            setObjlesson(res)
        })
        console.log('lesson ', objlesson)
    }

    useEffect(() => {
        fetchlesson()
    }, []);
    
    return(
        <div>
            {objlesson?.map((obj)=> ( 
            <ChapterBox  show={show} mynum={obj.ID} catId={props.catId} changeShow={changeShow}/>))} 
    
        </div>
    )
}

export default LessonBox



