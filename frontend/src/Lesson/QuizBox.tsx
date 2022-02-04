import React, { useEffect, useState } from "react";
import './Lesson.css'
import { useHistory } from "react-router";
import PopupQuiz from "./PopupQuiz";
const QuizBox=(props:any)=>{

    const open=()=>{
        props.onOpen()
    }

    return(
        <div style={{
            background: "#F2F2F2",
          }} className='clickwordquiz' onClick={open}>

           แบบทดสอบที่ {props.lessonid[0].Lesson_ID}


        </div>
        
    )
}

export default QuizBox