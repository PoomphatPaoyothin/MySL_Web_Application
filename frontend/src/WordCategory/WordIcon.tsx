import React from "react";
import './WordCategory.css';
import { useHistory } from "react-router";

const WordIcon = (props:any) =>{
    const history=useHistory()
    console.log('aaa',props.firstword)
    const gotolesson=()=>{
        history.push(`/lesson/${props.catid}/${props.firstword}`)
    }
    return(
        <div className='iconPos' onClick={gotolesson}>
            <img className='imgIcon' src={props.image}/> 
            <p className='nameCategory'>{props.name}</p>
        </div>
    )
}

export default WordIcon