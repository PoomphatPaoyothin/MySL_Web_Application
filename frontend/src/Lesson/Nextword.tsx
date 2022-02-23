import React, { useEffect, useState } from "react";
import './Lesson.css'
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

const Nextword=(props:any)=>{
    const history=useHistory()
    const [word, setWord] = useState<string>()
    const [objword, setObjword] = useState<any>([])
    const [nextword, setNextword] = useState<string>()
    const [isnext, setIsnext] = useState<boolean>(false)
    const [setfinish, setSetFinish] = useState<boolean>(false)
    const [isback, setIsback] = useState<boolean>(false)
    useEffect(() => {
        setWord(props.word)
        setObjword(props.objword)
    }, [props.objword, props.word]);

    useEffect(() => {
        let size = objword.length
        for (let i=0; i<size; i++) 
        {
            if(objword[i].Word_name == word)
            {
                if(i == size-1)
                {
                    setIsnext(true)
                    setIsback(false)
                }
                else{
                    if(i == 0)
                    {
                        setIsback(true)
                        setIsnext(false)
                    }
                    else
                    {
                        setIsnext(false)
                        setIsback(false)
                    }
                }
            }
        }
    }, [props.objword, props.word]);


    useEffect(() => {
        if(setfinish)
        {
            gonextword()
        }
    }, [setfinish]);

    useEffect(() => {
        console.log('sssssssssss', isnext)
    }, [isnext]);

    const findnext=()=>{
        let size = objword.length
        for (let i=0; i<size; i++) 
        {

            if(objword[i].Word_name == word)
            {
                if(i+1 < size)
                {
                    setNextword(objword[i+1].Word_name)
                    setSetFinish(true)
                }
            }
        }
    }

    const findback=()=>{
        let size = objword.length
        for (let i=0; i<size; i++) 
        {
            if(objword[i].Word_name == word)
            {
                if(i>=1)
                {
                    setNextword(objword[i-1].Word_name)
                    setSetFinish(true)
                }
            }
        }
    }
    const gonextword=()=>{
        history.push(`/lesson/${objword[0].Category_ID}/${nextword}`)
        setSetFinish(false)
    }

    return(
        <div className="nextwordbox">
            
            <Button className='nextwordbutton' disabled={isback} onClick={findback}>คำก่อนหน้า</Button>
            <Button className='nextwordbutton'  disabled={isnext} onClick={findnext}>คำถัดไป</Button>


        </div>
    )
}

export default Nextword