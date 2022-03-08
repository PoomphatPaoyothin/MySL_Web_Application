import React, { useEffect, useState } from "react";
import LessonBox from "./LessonBox";
import Navigatebar from "../Navbar/Navigatebar";
import LessonService from "./LessonService";
import RegisterService from "../Register/RegisterService";
import { useHistory } from "react-router-dom";
import Camera from "../Camera/Camera";
import ReactPlayer from 'react-player'
import VideoPlayer from "./VideoPlayer";
import Nextword from "./Nextword";
import { Button, ListGroup, OverlayTrigger, Popover } from "react-bootstrap";
import Tutorialpopup from "./Tutorialpopup";

const Lesson=(props:any)=>{
    const catId = props.match.params.catId;
    const word =  props.match.params.word;

    const [objcat, setObjcat] = useState<any[]>()
    const [objlesson, setObjlesson] = useState<any[]>()
    const [objword, setObjword] = useState<any[]>()
    const [myid2,setMyid2] = useState<any>();

    const [objlesson2, setObjlesson2] = useState<any[]>()
    const history=useHistory()
    const myid = localStorage.getItem('id');
    const [userinfo,setUserinfo] = useState<any>()
    const [namecat, setNamecat] = useState<string>('')
    const [popuptutorial, setPopuptutorial] = useState(false)
    const handleclose =() =>{setPopuptutorial(false)}

    const fetchwordCat=()=>{
        LessonService.fetchwordCat()
        .then(res=>{
            setObjcat(res)
            setNamecat(res[catId-1].Category_name)
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
        setMyid2(localStorage.getItem('id'))
    },[])
    useEffect(()=>{
        if(myid2)
        {
            RegisterService.fetchuserprofile(myid2)
            .then(res=>{
                setUserinfo(res)
            })
        }
    },[myid2])


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
        if(myid != null){
            LessonService.fetchlessonstat(myid)
        }
    }, []);

    useEffect(() => {
        newobjlesson()
    }, [objlesson]);
    const showTutorial=()=>{
        setPopuptutorial(true)
    }
    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">หมายเหตุ!</Popover.Header>
          <Popover.Body>
            ระบบจะทำการเลือกคำศัพท์ที่ใกล้เคียงกับท่าที่ทำมากที่สุด<strong> ในแต่ละบทเรียน</strong>
          </Popover.Body>
        </Popover>
      );

    return(
        <div className='lessonCotainer'>
            <div className='title'>
                <ListGroup.Item variant= "secondary" >
                    {namecat}
                    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                        <Button className="Warnbutton" variant="info"> หมายเหตุ! </Button>
                    </OverlayTrigger>

                    <Button className="Warnbutton" variant="info" onClick={showTutorial}> วิธีการเรียน </Button>

                </ListGroup.Item>
            </div>
            {
                Iswordincat() &&
                <div className='lessonContainersmall'>
                    <LessonBox objlesson={objlesson2} objword={objword} catId={catId} defaultchap={Defaultchap()} word={word}/>
                    {/* {showWord()} */}
                    <div className='twocomponent'>
                        {/* <div className='wordshowtop'>{word}</div> */}
                        <div className='camandvideo'>
                            <Camera  catid={catId} word={word}/>
                            <VideoPlayer objword={objword} word={word}/>
                        </div>

                    </div>


                    <Nextword objword={objword} word={word}/>

                </div>

            }
            <Tutorialpopup show={popuptutorial} handleClose={handleclose}/>
        </div>
    )
}

export default Lesson