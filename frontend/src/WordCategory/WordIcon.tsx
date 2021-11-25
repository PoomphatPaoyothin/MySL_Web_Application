import React from "react";
import './WordCategory.css';

const WordIcon = (props:any) =>{

    return(
        <div className='iconPos'>
            <img className='imgIcon' src={props.image}/> 
            <p className='nameCategory'>{props.name}</p>
        </div>
    )
}

export default WordIcon