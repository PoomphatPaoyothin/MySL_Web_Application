import React, { useEffect, useState } from "react";
import WordBox from "./WordBox";
import LessonService from "./LessonService";
import { useHistory } from "react-router";
import QuizBox from "./QuizBox";
import PopupQuiz from "./PopupQuiz";

const ChapterBox=(props:any)=>{
    const [visible,setVisible] = useState<Boolean>(false);
    const [visiblepopup, setVisiblepopup] = useState<boolean>(false)
    const [objword, setObjword] = useState<any[]>();
    const history = useHistory()

    const openChapter=() =>{
        setVisible(true);
        if(objword != undefined)
        {
            props.changeshowchapter(objword[0].Lesson_ID)
        }
    }


    const Isshow=()=>{
        if(objword != undefined)
        {
            if(objword[0].Lesson_ID == props.showchapter){
                setVisible(true)
            }
            else{
                setVisible(false)
            }
        }
    }
    


    const closeHandler=() => {
        setVisiblepopup(false);
    }

    const openpopup=()=>{
        setVisiblepopup(true)
    }


    useEffect(() => {
        setObjword(props.objword)
    }, [props.objword]);

    useEffect(() => {
        Isshow()
    }, [props.showchapter,objword]);

    
    return(
        <div>
            <button onClick={openChapter} className='buttonChapter'>บทเรียนที่ {props.mychapter}</button>

            {visible &&
            <div>
                {objword?.map((obj)=>(<WordBox word ={obj.Word_name} chapter={props.mychapter} lesson={objword[0].Category_ID} globalword={props.word} />))}
                <QuizBox lessonid={objword} onOpen={openpopup}/>
            </div>
            
            }
            <PopupQuiz        
            onClose = {closeHandler}
            show = {visiblepopup}
            objword = {objword}
            />
        </div>
    )
}

export default ChapterBox



