import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import LessonService from "./LessonService";


const Test=()=>{
    const [data, setData] = useState()
    const [nums, setNums] = useState<number>(0)


    const start=()=>{
        const tmp = {
            num: nums
        }
        LessonService.plusint(tmp)
        .then(res=>{
            const tmp2 = parseInt(res);
            setNums(tmp2)
        })
    }



    

    return(
        <div>
            <button onClick={start}> CLick</button>
            {nums}
        </div>

    )
}


export default Test

