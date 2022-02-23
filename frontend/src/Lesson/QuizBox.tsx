import React, { useEffect, useState } from "react";
import './Lesson.css'
import { useHistory } from "react-router";
import PopupQuiz from "./PopupQuiz";
import { ListGroup } from "react-bootstrap";
const QuizBox=(props:any)=>{

    const open=()=>{
        props.onOpen()
    }

    return(
        <div>

           
           <ListGroup.Item variant= "secondary" action onClick={open}>แบบทดสอบที่ {props.lessonid[0].Lesson_ID}</ListGroup.Item>


        </div>
        
    )
}

export default QuizBox