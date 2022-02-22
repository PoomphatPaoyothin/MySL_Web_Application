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
            console.log('ssssssssssssssssssssssssssssssssssssssss')
            setIsFinish(true)
            let obj2 = {
                catid:catId,
                lessonid:lessonId,
                score:score
            }
            console.log('objjjjjj ', obj2)
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
    console.log('is alreadyfetch',alreadyfetch)
    console.log('is finish',isFinish)

    useEffect(() => {
        console.log('alreadyfetch inside',alreadyfetch)
        if(alreadyfetch)
        {
            submit()
        }   
    }, [gosubmit]);
    console.log('score issss', score)
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
        localStorage.setItem('score', '0')
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
                    console.log(obj[i].Word_name)
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
    return(
        <div>
            {
                !isFinish &&
                <div>
                    {
                        isShowcount && <div> แบบทดสอบ เริ่มใน.. {counter} </div>
                    }

                    <button disabled={isStart == true} onClick={start}>เริ่มแบบทดสอบ</button>

                    <button onClick={backlesson}>กลับสู่บทเรียน</button>
                    {
                        isStart && !isShowcount &&
                        <div>
                            {allword ? 
                            (<CameraQuiz setcorrect={setcorrect}  isClose={isClose} disabled={disableButton} lessonid={lessonId} catid={catId} word={allword[numberword].Word_name}/>):(<div></div>)}

                            **กรุณาเปิดกล้องเพิ่อทำแบบทดสอบ**
                            <Button variant="primary" size="lg" disabled={canNext} onClick={nextword}>{submitword}</Button>
                            
                        </div>
                    }
                    <PopupconfirmQuiz show={show} onClose={closeHandler} getStart={getStart} />
         
                </div>
            }
            {
                isFinish &&
                <div>
                    คะแนนของคุณคือ.. {score}
                    <button onClick={backlesson}>
                        กลับสู่บทเรียน
                    </button>
                    <button onClick={startRe}>
                        สอบใหม่อีกครั้ง
                    </button>
                    <PopupconfirmRequiz show={showRe} onClose={closeHandlerRe} getStart={reexam} isFinishHandle={isFinishHandle}/>
                </div>
            }
        </div>
    )
}

export default Quiz