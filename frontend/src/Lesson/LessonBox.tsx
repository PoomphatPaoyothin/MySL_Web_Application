// import React, { useState } from "react";
// import ChapterBox from "./ChapterBox";

// const LessonBox=()=>{
//     return(
//         <div>
//             <ChapterBox no='1'/>
//             <ChapterBox no='2'/>
//             <ChapterBox no='3'/>
//             <ChapterBox no='4'/>
//             <ChapterBox no='5'/>
//         </div>
//     )
// }

// export default LessonBox


import React, { useState } from "react";
import WordBox from "./WordBox";

const LessonBox=(props:any)=>{
    const [visible1,setVisible1] = useState<Boolean>(false);
    const [visible2,setVisible2] = useState<Boolean>(false);
    const [visible3,setVisible3] = useState<Boolean>(false);
    const [visible4,setVisible4] = useState<Boolean>(false);
    const [visible5,setVisible5] = useState<Boolean>(false);


    const openChapter1=() =>{
        setVisible1(!visible1);

        setVisible2(false);
        setVisible3(false);
        setVisible4(false);
        setVisible5(false);
    }

    const openChapter2=() =>{
        setVisible2(!visible2);

        setVisible1(false);
        setVisible3(false);
        setVisible4(false);
        setVisible5(false);
    }
    const openChapter3=() =>{
        setVisible3(!visible3);

        setVisible1(false);
        setVisible2(false);
        setVisible4(false);
        setVisible5(false);
    }
    const openChapter4=() =>{
        setVisible4(!visible4);

        setVisible1(false);
        setVisible3(false);
        setVisible2(false);
        setVisible5(false);
    }
    const openChapter5=() =>{
        setVisible5(!visible5);

        setVisible1(false);
        setVisible3(false);
        setVisible4(false);
        setVisible2(false);
    }
    
    return(
        <div>
            <button onClick={openChapter1} className='buttonChapter'>บทเรียนที่1</button>
            {visible1 &&
            <div>
                <WordBox word='สวัสดี'/>
                <WordBox word='ขอโทษ'/>
                <WordBox word='ขอบคุณ'/>
                <WordBox word='เสียใจ'/>
                <WordBox word='เป้นห่วง'/>
                <WordBox word='แบบทดสอบ'/>
            </div>
            }

            <button onClick={openChapter2} className='buttonChapter'>บทเรียนที่2</button>
            {visible2 &&
            <div>
                <WordBox word='สวัสดี'/>
                <WordBox word='ขอโทษ'/>
                <WordBox word='ขอบคุณ'/>
                <WordBox word='เสียใจ'/>
                <WordBox word='เป้นห่วง'/>
                <WordBox word='แบบทดสอบ'/>
            </div>
            }

            <button onClick={openChapter3} className='buttonChapter'>บทเรียนที่3</button>
            {visible3 &&
            <div>
                <WordBox word='สวัสดี'/>
                <WordBox word='ขอโทษ'/>
                <WordBox word='ขอบคุณ'/>
                <WordBox word='เสียใจ'/>
                <WordBox word='เป้นห่วง'/>
                <WordBox word='แบบทดสอบ'/>
            </div>
            }

            <button onClick={openChapter4} className='buttonChapter'>บทเรียนที่4</button>
            {visible4 &&
            <div>
                <WordBox word='สวัสดี'/>
                <WordBox word='ขอโทษ'/>
                <WordBox word='ขอบคุณ'/>
                <WordBox word='เสียใจ'/>
                <WordBox word='เป้นห่วง'/>
                <WordBox word='แบบทดสอบ'/>
            </div>
            }

            <button onClick={openChapter5} className='buttonChapter'>บทเรียนที่5</button>
            {visible5 &&
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

export default LessonBox



