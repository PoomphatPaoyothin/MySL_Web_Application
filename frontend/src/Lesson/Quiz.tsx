import React, { useEffect, useState } from "react";
import './Lesson.css'
import LessonService from "./LessonService";
import { useHistory } from "react-router";
import CameraQuiz from "../Camera/CameraQuiz";
import PopupConfirmPassword from "../Profile/PopupConfirmPassword";
import PopupconfirmQuiz from "./PopupconfirmQuiz";
import PopupconfirmRequiz from "./PopupconfirmRequiz";
import Button from 'react-bootstrap/Button';


const Quiz=(props:any)=>{
    let time=3
    const history = useHistory()
    const catId = props.match.params.catId;
    const lessonId =  props.match.params.lessonId;
    const userid = localStorage.getItem('id');
    const [obj, setObj] = useState<any>();
    const [word, setWord] = useState<string>();
    const [show, setShow] = useState<boolean>(false);
    const [showRe, setShowRe] = useState<boolean>(false);

    const [counter, setCounter] = useState<number>(time)
    const [isStart, setIsStart] = useState<boolean>(false)
    const [isShowcount, setIsshowcount] = useState<boolean>(false)
    const [allword, setAllword] = useState<any>()
    const [numberword, setNumberword] = useState<number>(0)
    const [score, setScore] = useState<number>(0)
    const [isFinish, setIsFinish] = useState<boolean>(false)
    const [canNext, setCannext] = useState<boolean>(true)
    const [isClose, setIsClose] = useState<boolean>(false)
    const [submitword, setSubmitword] = useState<string>('คำต่อไป')
    const [iswordcorrect, setIswordcorrect] = useState<boolean>(false)
    const [doscore, setDoscore] = useState<boolean>(false)
    const [gosubmit, setGosubmit] =useState<boolean>(false)
    const [alreadyfetch, setAlreadyfetch] = useState<boolean>(false)

    const backlesson=()=>{
        history.push(`/lesson/${catId}/${word}`)
    }
    const start=()=>{
        setShow(true)
    }
    const startRe=()=>{
        setShowRe(true)
    }
    const closeHandler=()=>{
        setShow(false)
    }

    const closeHandlerRe=()=>{
        setShowRe(false)
    }
    const getStart=(status:boolean)=>{
        setIsStart(status)
    }
    const disableButton=(value:boolean)=>{
        setCannext(value)
    }
    useEffect(() => {
        LessonService.fetchword(catId)
        .then(res=>{
            setObj(res)
        })
        if(userid)
        {
            LessonService.isquizscore(userid,catId,lessonId)
            .then(res=>{
                setIsFinish(res.is_quiz)
                setScore(res.score)
                setAlreadyfetch(true)
            })
        }
    }, []);

    useEffect(() => {
        if(isStart == true)
        {
            setTimeout(() => setCounter(counter - 1), 1000);
            setIsshowcount(true)
        }
    }, [isStart]);

    
    useEffect(() => {
        if(counter > 0 && counter < time)
        {
            setTimeout(() => setCounter(counter - 1), 1000);
        }
        else
        {   setIsshowcount(false)

        }
    }, [counter]);
    const plusscore=(isCorrect:boolean)=>{
        if(isCorrect == true)
        {
            setScore(score+1)
            setDoscore(!doscore)
        }
    }
    const nextword=()=>{
        if(isLastword() == false)
        {
            setCannext(true)
            setIsClose(true)
            plusscore(iswordcorrect)
            if(numberword < 2)
            {
                setNumberword(numberword+1)
            }
        }
        else
        {
            plusscore(iswordcorrect)
            setGosubmit(true)
        }



    }
    const submit=()=>{
        if(!isFinish)
        {
            setIsFinish(true)
            console.log('score in submit is', score)
            let obj2 = {
                catid:catId,
                lessonid:lessonId,
                score:score
            }
            if(userid != null)
            {
                LessonService.sendscore(obj2, userid)
                .then(res=>{
                        console.log(res)
                    }
                )
            }
        }

    }
    useEffect(() => {
        if(alreadyfetch)
        {
            console.log('score in already fetch ', score)
            submit()
        }   
    }, [gosubmit]);
    const isLastword=()=>{
        if(numberword == 2)
        {
            return true
        }
        else
        {
            return false
        }
    }
    const reexam=()=>{
        setIsFinish(false)
        setCounter(time)
        setIsStart(false)
        setIsshowcount(false)
        setScore(0)
        setNumberword(0)
        setSubmitword('คำต่อไป')
    }
    const setcorrect=(value:boolean)=>{
        setIswordcorrect(value)
      }
    useEffect(() => {
        if(obj)
        {
            let size = obj.length
            for(let i=0; i<size; i++)
            {
                if(obj[i].Lesson_ID == lessonId)
                {
                    let tmp = []
                    tmp.push(obj[i])
                    tmp.push(obj[i+1])
                    tmp.push(obj[i+2])
                    setAllword(tmp)

                    setWord(obj[i].Word_name)
                    break
                }
            }
        }
    }, [obj]);

    useEffect(() => {
        if(isLastword() == true)
        {
            setSubmitword('ส่งคำตอบ')
        }
    }, [isLastword]);
    const isFinishHandle=(value:boolean)=>{
        setIsFinish(value)
    }
    const gotogetstart=()=>{
        getStart(true)
    }
    return(
        <div>
            {
                !isFinish &&
                <div>
                    {
                        isShowcount && <div className="showscoreContainer"><p className="showscore"> แบบทดสอบ เริ่มใน.. {counter} </p> </div>
                    }
                    <div className="showscoreContainer">
                        <div>
                        {
                         !isStart && <img className="successexam2" src='https://cdn.discordapp.com/attachments/622738769786830858/946075166230872105/giphy_1.gif' />
                            
                        }
                        </div>

                        <Button className={'buttonscore2'} disabled={isStart == true} onClick={gotogetstart}>เริ่มแบบทดสอบ</Button>

                        <Button className={'buttonscore2'} onClick={backlesson}>กลับสู่บทเรียน</Button>
                    </div>

                    {
                        isStart && !isShowcount &&
                        <div className='examcontainer'>
                            {allword ? 
                            (<CameraQuiz setcorrect={setcorrect}  isClose={isClose} disabled={disableButton} lessonid={lessonId} catid={catId} word={allword[numberword].Word_name}/>):(<div></div>)}
                            <div></div>
                            <Button variant="primary" size="lg" disabled={canNext} onClick={nextword} className="nextquizbutton">{submitword}</Button>
                            <div className="opencamtext">**กรุณาเปิดกล้องเพื่อทำแบบทดสอบ**</div>
                        </div>
                    }
         
                </div>
            }
            {
                isFinish &&
                <div className='showscoreContainer'>
                    <p className='showscore'>ยินดีด้วยคุณทำแบบทดสอบจบแล้ว</p>
                    <p className='showscore'> คะแนนของคุณคือ.. {score}</p>
                    <div>
                        <img className="successexam" src='https://cdn.discordapp.com/attachments/622738769786830858/946072823506559036/giphy.gif'/>
                    </div>
                    <Button className={'buttonscore'} onClick={backlesson}>
                        กลับสู่บทเรียน
                    </Button>
                    <Button className={'buttonscore'} onClick={startRe}>
                        สอบใหม่อีกครั้ง
                    </Button>
                    <PopupconfirmRequiz show={showRe} close={closeHandlerRe} getStart={reexam} isFinishHandle={isFinishHandle}/>
                </div>
            }
        </div>
    )
}

export default Quiz