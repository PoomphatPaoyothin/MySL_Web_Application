import React, { useEffect, useState } from "react";
import ChapterBox from "./ChapterBox";
import LessonService from "./LessonService";

const LessonBox=(props:any)=>{

    const [objlesson, setObjlesson] = useState<any[]>()
    const [objword, setObjword] = useState<any[]>()
    const [showchapter, setShowchapter] = useState<number>(props.defaultchap)


    const newobjword=(mychapter:any)=>{
        if(objword != undefined)
        {
            let size = objword?.length
            let tmp: any[] = []
            for(let i=0; i<size; i++)
            {
                if(objword[i].Lesson_ID == mychapter)
                {
                    tmp.push(objword[i])
                }
            }
            return tmp
        }

    }
    
    const changeshowchapter=(i:number)=>{
        setShowchapter(i)
    }

    useEffect(() => {
        setObjlesson(props.objlesson)
    }, [props.objlesson]);

    useEffect(() => {
        setObjword(props.objword)
    }, [props.objword]);
    
    return(
        <div className="lessonBox">
            {objlesson?.map((obj)=> ( 
            <ChapterBox objword={newobjword(obj)} mychapter={obj} showchapter={showchapter} changeshowchapter={changeshowchapter} word={props.word}/>))} 
        </div>
    )
}

export default LessonBox



