import React, { useEffect, useState } from "react";
import LessonBox from "./LessonBox";
import Navigatebar from "../Navbar/Navigatebar";
import LessonService from "./LessonService";
import VideoPlayer from "./VideoPlayer";
import RegisterService from "../Register/RegisterService";
import { useHistory } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import Camera from "../Camera/Camera";

const Lesson=(props:any)=>{
    const catId = props.match.params.catId;
    const word =  props.match.params.word;

    const [objcat, setObjcat] = useState<any[]>()
    const [objlesson, setObjlesson] = useState<any[]>()
    const [objword, setObjword] = useState<any[]>()

    const [objlesson2, setObjlesson2] = useState<any[]>()
    const history=useHistory()
    const myid = localStorage.getItem('id');
    const [userinfo,setUserinfo] = useState<any>()


    const fetchwordCat=()=>{
        LessonService.fetchwordCat()
        .then(res=>{
            setObjcat(res)
        })
    }

    const fetchlesson=()=>{
        LessonService.fetchlesson(catId)
        .then(res=>{
            setObjlesson(res)
        })
    }

    
    const fetchword=()=>{
        LessonService.fetchword(catId)
        .then(res=>{
            setObjword(res)
        })
    }

    const showcatname=()=>{
        if(objcat !== undefined)
        {
            let size = objcat.length
            for(let i=0; i<size; i++)
            {
                if(catId == objcat[i].ID)
                {
                    return objcat[i].Category_name
                }
            }
        }
    }

    const newobjlesson=()=>{
        if(objlesson != undefined){
            let size = objlesson?.length
            let tmp = []
            for(let i=1; i<size+1; i++){
                tmp?.push(i)
            }
            setObjlesson2(tmp)
        }
    }

    const Iswordincat=()=>{
        if(objword != undefined)
        {
            let size = objword.length
            let status = false
            let chap = 0
            for(let i=0; i<size; i++)
            {
                if(objword[i].Word_name == word)
                {
                    status = true
                    chap = objword[i].Lesson_ID
                }
            }
            return(status)
        }

    }

    const Defaultchap=()=>{
        if(objword != undefined)
        {
            let size = objword.length
            let chap = 0
            for(let i=0; i<size; i++)
            {
                if(objword[i].Word_name == word)
                {
                    chap = objword[i].Lesson_ID
                }
            }
            return(chap)
        }

    }


    ///////////////////////////////////////////////////////////////////////////////////
    useEffect(()=>{
        RegisterService.fetchuserprofile(myid)
        .then(res=>{
            setUserinfo(res)
        })
    },[])


    useEffect(()=>{
        if(userinfo !=undefined)
        {
            if(userinfo.register_stat == 1)
            {
                history.push(`/register/2/${myid}`)
            }
            else if(userinfo.register_stat == 2)
            {
                history.push(`/register/3/${myid}`)
            }
            // else if(userinfo.register_stat == 3)
            // {
            //     history.push(`/`)
            // }
        }

    },[userinfo])


///////////////////////////////////////////////////////////////////////////////////
    const showWord=()=>{
        return(word)
    }
    useEffect(() => {
        fetchwordCat()
        fetchlesson()
        fetchword()
    }, [catId,word]);


    useEffect(() => {
        newobjlesson()
    }, [objlesson]);


    return(
        <div>
            <div>
                
            </div>
            {
                Iswordincat() &&
                <div>
                    {showcatname()}
                    <LessonBox objlesson={objlesson2} objword={objword} catId={catId} defaultchap={Defaultchap()} word={word}/>
                    {showWord()}
                    <Camera/>
                    <VideoPlayer objword={objword} word={word}/>
                </div>

            }

        </div>
    )
}

export default Lesson