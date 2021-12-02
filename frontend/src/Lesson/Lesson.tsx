import React, { useEffect, useState } from "react";
import LessonBox from "./LessonBox2";
import Navigatebar from "../Navbar/Navigatebar";
import LessonService from "./LessonService";

const Lesson=(props:any)=>{
    const catId = props.match.params.catId;
    const [wordCatobj, setWordCatobj] = useState<any[]>()

    const fetchwordCat=()=>{
        LessonService.fetchwordCat()
        .then(res=>{
            setWordCatobj(res)
        })
    }

    const checkcat=()=>{
        if(wordCatobj !== undefined)
        {
            let size = wordCatobj.length
            for(let i=0; i<size; i++)
            {
                if(catId == wordCatobj[i].ID)
                {
                    return wordCatobj[i].Category_name
                }
            }
        }

    }
    useEffect(() => {
        fetchwordCat()
    }, []);
    return(
        <div>
            {checkcat()}
            <LessonBox catId = {catId}/>
            {/* <Video/> */}
        </div>
    )
}

export default Lesson