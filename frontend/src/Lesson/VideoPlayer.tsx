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





    const opts = {
        height: '500',
        width: '600',
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