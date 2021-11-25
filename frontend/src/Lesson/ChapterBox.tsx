import React, { useState } from "react";
import WordBox from "./WordBox";

const ChapterBox=(props:any)=>{
    const [visible,setVisible] = useState<Boolean>(false);

    const openChapter1=() =>{
        setVisible(!visible);
    }
    
    return(
        <div>
            <button onClick={openChapter1} className='buttonChapter'>บทเรียนที่{props.no}</button>
            {visible &&
            <div>
                <WordBox word='สวัสดี'/>
                <WordBox word='ขอโทษ'/>
                <WordBox word='ขอบคุณ'/>
                <WordBox word='เสียใจ'/>
                <WordBox word='เป้นห่วง'/>
                <WordBox word='แบบทดสอบ'/>
            </div>
            }
        </div>
    )
}

export default ChapterBox



