import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ForgetService from "./ForgetService";
import Popuploading from "../Loadingpop/PopupLoading";
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import './forgetpass.css'
import { Button } from "react-bootstrap";
import Alertshow from "../Profile/Alertshow";

const Forget1 = (props:any) =>{
    const history=useHistory()
    const [email,setEmail] = useState<string>()
    
    const [popload, setPopload] = useState(false)
    const closepopload = ()=>{setPopload(false)}

    const [popalert, setPopalert] = useState(false)
    const closealert = ()=>{setPopalert(false)}
    const [text,setText] = useState('')

    const email_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
      }

    const gotonext=()=>{
        setPopload(true)
        const obj={
            email:email
        }
        ForgetService.patchemail(obj)
        .then(res=>{
            console.log('res is',res)
            if(res)
            {
                if(email!=undefined)
                {
                    localStorage.removeItem('email')
                    localStorage.setItem('email',email)
                    setPopload(false)
                    history.push('/forgetpass/2')
                }

            }
            else{
                setText('ไม่มีอีเมล์นี้')
                setPopalert(true)
                setPopload(false)
            }
        })
    }

    useEffect(()=>{
        if(localStorage.getItem('id') != undefined)
        {
            history.push(`/forgetpass/3/${localStorage.getItem('id')}`)
        }
    },[])
    const cancel=()=>{
        history.push('/')
    }

    return(
        <div>
            { localStorage.getItem('accesToken') == undefined &&
            <div>
                <div className="text1">
                    กรุณากรอกอีเมลของท่าน
                </div>
                <div className="center">
                    <input value={email}  onChange={email_input} className="inputemail" placeholder="อีเมล" required />
                </div>
                <Button  onClick={gotonext} className="nextbuttonnew2">ต่อไป</Button>
                <Button  onClick={cancel} className="nextbuttonnew1">ยกเลิก</Button>
                
                <Popuploading show={popload} setshow={closepopload}/>
                <Alertshow txt={text} show={popalert} onHide={closealert} />
            </div> 

            }

        </div>
    )
}

export default Forget1