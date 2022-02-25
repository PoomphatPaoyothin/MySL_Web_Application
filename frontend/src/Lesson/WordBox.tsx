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
        <div style={{
            background: Ismyword() ? "#d0e4fc" : "#F2F2F2",
            border: Ismyword() ? "solid 1px darkblue" : "#F2F2F2",
            
        }} onClick={showword} className='listgroup'>
        {props.word}
        </div>

    )
}

export default WordBox