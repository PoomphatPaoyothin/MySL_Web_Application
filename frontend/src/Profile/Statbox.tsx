import React, { useEffect, useState } from "react";
import { wordInfo } from "./InterfaceProfile";
import './Profile.css';
import ProfileService from "./ProfileService";


const Statbox=(props:any)=>{

    return(
        <div className='statboxBG'>
            <div className='wordallPos'>
                <div className='namecategory'>
                    {props.name}
                </div>
                <br/>
                <div className='lessonword'>
                    lesson-- {(props.Lesson_learned/props.Lesson_amount)*100}%
                </div>
                <div className='lessonquiz'>
                    quiz-- {(props.category_quiz_score/10)*100}%
                    <br/>
                </div>
               
            </div>
            

        </div>
    )
}

export default Statbox