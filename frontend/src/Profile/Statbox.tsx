import React, { useEffect, useState } from "react";
import './Profile.css';
import ProfileService from "./ProfileService";
import {StatInfo} from './InterfaceProfile'
import { stat } from "fs";

const Statbox=()=>{
    const id = localStorage.getItem('id');
    const [statobj,setStatobj] = useState<StatInfo[]>();

    const fetchNameLesson=()=>{
        return(
            ProfileService.fetchNameLesson(id)
            .then(res=>{
                setStatobj(res);

            })
        )
    }
    useEffect(()=>{
        fetchNameLesson()
    },[])
    return(
        <div className='statboxBG'>
            <div>
                {statobj?.map((obj)=> ( 
                        obj.CategoryID
                    ))} 
            </div>
            <div>
                lesson
            </div>
            <div>
                quiz
            </div>
        </div>
    )
}

export default Statbox