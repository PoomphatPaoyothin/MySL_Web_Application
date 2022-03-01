import React, { useEffect, useState } from "react";
import './Lesson.css'
import { useHistory} from "react-router";
import PopupQuiz from "./PopupQuiz";
import { ListGroup } from "react-bootstrap";
import LessonService from "./LessonService";
const QuizBox=(props:any)=>{
    const userid = localStorage.getItem('id');
    const open=()=>{
        props.onOpen()
    }
    const [color, setColor] = useState<string>('#F2F2F2')
    const [colorfont, setColorfont] = useState<string>('black')
    
    useEffect(() => {
        if(userid)
        {
            LessonService.isquizscore(userid,props.catId,props.lessonid[0].Lesson_ID)
            .then(res=>{
                if(res.is_quiz)
                {
                    setColor('#157347')
                    setColorfont('white')
                }
            })
        }
    }, []);
    return(
            <div style={{
                background: `${color}`,
                color:`${colorfont}`,
            }} onClick={open} className='listgroup2'>

            แบบทดสอบ

            </div>
    )
}

export default QuizBox