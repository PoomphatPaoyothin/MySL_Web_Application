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

    console.log(isStart)
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
    const disableButton=()=>{
        console.log('aaaaaaaaaaaaaaa')
        setCannext(false)
    }
    useEffect(() => {
        LessonService.fetchword(catId)
        .then(res=>{
            setObj(res)
        })
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
    const nextword=()=>{
        if(numberword < 2)
        {
            setCannext(true)
            let obj = {
                a:'test'
            }
            setNumberword(numberword+1)
        }
    }
    const submit=()=>{
        setIsFinish(true)
        // LessonService.sendscore(score)
    }
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
                            (<CameraQuiz disabled={disableButton} lessonid={lessonId} catid={catId} word={allword[numberword].Word_name}/>):(<div></div>)}

                            **กรุณาเปิดกล้องเพิ่อทำแบบทดสอบ**

                            {
                                isLastword() && <button onClick={submit}>ส่ง</button>
                            }

                            {
                                !isLastword() && <Button variant="primary" size="lg" disabled={canNext} onClick={nextword}>คำต่อไป</Button>
                            }
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
                    <PopupconfirmRequiz show={showRe} onClose={closeHandlerRe} getStart={reexam} />
                </div>
            }
        </div>
    )
}

export default Quiz