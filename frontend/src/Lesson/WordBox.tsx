import React from "react";
import './Lesson.css'
import { useHistory } from "react-router";
import { ListGroup } from "react-bootstrap";
const WordBox=(props:any)=>{
    const history=useHistory()


    const showword=() =>{
        history.push(`/lesson/${props.lesson}/${props.word}`)
    }

    const Ismyword=()=>{
        // console.log(props.globalword, props.word)
        if(props.globalword == props.word)
        {
            // console.log('it is trueeeee', props.word)
            return true
        }
        else{
            return false
        }
    }

    return(
        <div>

            <ListGroup.Item variant= {Ismyword() ? "primary" : "secondary"} action onClick={showword}>{props.word}</ListGroup.Item>

        </div>

    )
}

export default WordBox