import React, { useEffect, useState } from "react";
import './Lesson.css'
import { useHistory } from "react-router-dom";
import YouTube from 'react-youtube';
import LessonService from "./LessonService";

const VideoPlayer=(props:any)=>{
    const history=useHistory()
    const [word, setWord] = useState<string>()
    const [objword, setObjword] = useState<any>([])
    const [nextword, setNextword] = useState<string>()
    const [videolink,setVideolink] = useState('s')

    useEffect(() => {
        setWord(props.word)
        setObjword(props.objword)
    }, [props.objword, props.word]);

    useEffect(() => {
        LessonService.fetchlinkvideo(props.word)
        .then(res=>{
            setVideolink(res.Word_Video)
        })
    }, [props.word]);




    const opts = {
        height: '400px',
        width: '100%',
      };
    return(
        <div className="videoplayerbox">
            <div className='youtubePlayer'>
                {console.log('videolink:', videolink)}
                <YouTube videoId={videolink}opts={opts} />
            </div>
        </div>
    )
}

export default VideoPlayer