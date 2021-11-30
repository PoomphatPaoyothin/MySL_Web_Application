import React, { useEffect, useState } from "react";
import './Profile.css';


const Statbox=(props:any)=>{



    return(
        <div className='statboxBG'>
            <div className='wordallPos'>
                <div className='namecategory'>
                    {props.name}
                </div>
                <div className='lessonword'>
                    lesson-- {props.learnedChapter}
                </div>
                <div className='lessonquiz'>
                    quiz
                </div>
            </div>

        </div>
    )
}

export default Statbox