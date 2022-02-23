import React, { useEffect, useState } from "react";
import WordBox from "./WordBox";
import LessonService from "./LessonService";
import { useHistory } from "react-router";
import QuizBox from "./QuizBox";
import PopupQuiz from "./PopupQuiz";
import { Button, ListGroup } from "react-bootstrap";

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
            // console.log('sssss', objword[0].Lesson_ID, 'aaaaa', props.showchapter)
            if(objword[0].Lesson_ID == props.showchapter){
                setVisible(true)
            }
            else{
                setVisible(false)
            }
        }
    }
    

    const go_quiz=()=>{
        history.push(`/quiz/${props.objword[0].Category_ID}/${props.objword[0].Lesson_ID}`)
    }


    useEffect(() => {
        setObjword(props.objword)
    }, [props.objword]);

    useEffect(() => {
    }, [objword]);

    useEffect(() => {
        Isshow()
    }, [props.showchapter,objword]);

    useEffect(() => {
    }, []);
    
    return(
        <div className='chapterbox'>
            <Button onClick={openChapter} variant="warning" className='buttonChapter'>บทเรียนที่ {props.mychapter}</Button>

            {visible &&
            <div>   
                {objword?.map((obj)=>(<WordBox word ={obj.Word_name} chapter={props.mychapter} lesson={objword[0].Category_ID} globalword={props.word} />))}
                <QuizBox catId={props.catId} lessonid={objword} onOpen={go_quiz} lessonId={props.mychapter}/>
            </div>
            
            }

        </div>
    )
}

export default ChapterBox



