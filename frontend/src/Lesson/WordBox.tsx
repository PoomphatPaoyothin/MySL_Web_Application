import React from "react";
import './Lesson.css'
const WordBox=(props:any)=>{
    const showword=() =>{
        console.log(props.word)
    }
    return(
        <div onClick={showword} className='clickword'>
           {props.word}
        </div>
    )
}

export default WordBox