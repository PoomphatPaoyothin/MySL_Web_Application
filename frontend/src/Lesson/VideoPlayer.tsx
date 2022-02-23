import React, { useEffect, useState } from "react";
import './Lesson.css'
import { useHistory } from "react-router-dom";
import YouTube from 'react-youtube';

const VideoPlayer=(props:any)=>{
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

    const opts = {
        height: '390',
        width: '250',
      };
    return(
        <div className="videoplayerbox">
            <div className='youtubePlayer'>
                <YouTube videoId="qt4bR45dfO8" opts={opts} />
            </div>
        </div>
    )
}

export default VideoPlayer