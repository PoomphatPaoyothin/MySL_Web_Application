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
    useEffect(() => {
        if(userid)
        {
            LessonService.isquizscore(userid,props.catId,props.lessonid[0].Lesson_ID)
            .then(res=>{
                if(res.is_quiz)
                {
                    setColor('#4BB543')
                }
            })
        }
    }, []);
    return(
            <div style={{
                background: `${color}`,
            }} onClick={open} className='listgroup'>

            แบบทดสอบ

            </div>
    )
}

export default QuizBox