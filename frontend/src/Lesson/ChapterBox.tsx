import React, { useEffect, useState } from "react";
import WordBox from "./WordBox";
import LessonService from "./LessonService";

const ChapterBox=(props:any)=>{
    const [visible,setVisible] = useState<Boolean>(false);
    const [objword, setObjword] = useState<any[]>();

    const openChapter1=() =>{
        setVisible(true);
        props.changeShow(props.mynum)
    }

    const fetchword=() =>{
        LessonService.fetchword(props.catId)
        .then(res =>{
            setObjword(res)
        })
        // console.log('word is ', objword)
    }

    const showmylesson=(obj:any) =>{
        console.log('out is ',obj.Word_name, props.mynum)
        if(obj.Lesson_ID == props.mynum)
        {
            console.log('In is ',obj.Word_name)
            return true
        }
    }
    
    useEffect(() => {
        if(props.mynum == props.show)
        {
            setVisible(true)
        }
        else
        {
            setVisible(false)
        }
    }, [props.show]);


    useEffect(() => {
        fetchword()
    }, []);

    
    return(
        <div>
            <button onClick={openChapter1} className='buttonChapter'>บทเรียนที่ {props.mynum}</button>

            {visible &&
            <div>
                {objword?.map((obj)=>(showmylesson(obj)? <WordBox word ={obj.Word_name}/> :console.log()))}

            </div>
            }
        </div>
    )
}

export default ChapterBox



