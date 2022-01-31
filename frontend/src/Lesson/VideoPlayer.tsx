import React, { useEffect, useState } from "react";
import './Lesson.css'
import { useHistory } from "react-router-dom";


const VideoPlayer=(props:any)=>{
    console.log('props word is', props.word)
    const history=useHistory()
    const [word, setWord] = useState<string>()
    const [objword, setObjword] = useState<any>([])
    const [nextword, setNextword] = useState<string>()
    useEffect(() => {
        setWord(props.word)
        setObjword(props.objword)
    }, [props.objword, props.word]);


    useEffect(() => {
        findnext()
    }, [word]);

    const findnext=()=>{
        let size = objword.length
        for (let i=0; i<size; i++) 
        {
            if(objword[i].Word_name == word)
            {
                setNextword(objword[i+1].Word_name)
            }
        }
    }
    const gonextword=()=>{

        history.push(`/lesson/${objword[0].Category_ID}/${nextword}`)
    }

    return(
        <div >
            <button>คำก่อนหน้า</button>
            <button onClick={gonextword}>คำถัดไป</button>

        </div>
    )
}

export default VideoPlayer