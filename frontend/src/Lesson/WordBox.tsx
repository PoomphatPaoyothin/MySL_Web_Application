import React from "react";
import './Lesson.css'
import { useHistory } from "react-router";
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
            background: Ismyword() ? "#d3bdbd" : "#F2F2F2",
          }} onClick={showword} className='clickword'>
           {props.word}
        </div>
    )
}

export default WordBox