import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import Popuploading from "../Loadingpop/PopupLoading";
import Alertshow from "../Profile/Alertshow";
import ForgetService from "./ForgetService";

const Forget2 = (props:any) =>{
    const history=useHistory()
    const [otp,setOtp] = useState<string>()
    const email = localStorage.getItem('email')

    const [popload, setPopload] = useState(false)
    const closepopload = ()=>{setPopload(false)}

    const [popalert, setPopalert] = useState(false)
    const closealert = ()=>{setPopalert(false)}
    const [text,setText] = useState('')

    const otp_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setOtp(e.target.value);
    }
    const gotonext=()=>{
        setPopload(true)
        const obj={
            email:email,
            otp:otp 
        }

        ForgetService.checkotp(obj)
        .then(res=>{ 
            if(res.accessToken!=undefined)
            {
                setPopload(false)
                localStorage.removeItem('email')
                localStorage.setItem('id',res.UserId)
                localStorage.setItem('accessToken',res.accessToken)
                history.push(`/forgetpass/3/${res.UserId}`)
                
            }
            else
            {
                setPopload(false)
                setPopalert(true)
                setText('OTP ไม่ถูกต้องโปรดลองใหม่อีกครั้ง')
            }
        })

    }
    const cancel=()=>{
        history.push('/')
    }
    const resendOTP=()=>{
        setPopload(true)
        let obj={
            email:email
        }
        ForgetService.resendOTP(obj)
        .then(res=>{
            if(res)
            {
                setPopload(false)
                setPopalert(true)
                setText('ได้ทำการส่ง OTP อีกครั้งแล้ว')
            }
            else{
                setPopload(false)
                setPopalert(true)
                setText('ไม่มีมีอีเมล์นี้')
            }
        })
    }
    useEffect(()=>{
        if(localStorage.getItem('id') != undefined)
        {
            history.push(`/forgetpass/3/${localStorage.getItem('id')}`)
        }
    },[])
    return(
        <div>
        {localStorage.getItem('accesToken') == undefined &&
            <div>
                <div>
                    <div className="text1">เราได้ทำการส่งรหัสยืนยันไปยังอีเมลของคุณ <br/><br/>
                    กรุณาป้อนรหัสยืนยันจากอีเมล
                    </div>
                    <div className="center">
                        <input value={otp} className="inputemail2" onChange={otp_input} placeholder="ยืนยันรหัสผ่าน" required />
                    </div>
                    <div className="resendotppos">
                        <label onClick={resendOTP} className='resendotp'> 
                            ส่งรหัสยืนยันอีกครั้ง
                        </label>
                    </div>
                    <Button  onClick={cancel} className="nextbuttonnew1">ยกเลิก</Button>
                    
                    <Button  onClick={gotonext} className="nextbuttonnew2">ต่อไป</Button>
                </div>
            </div>
        }
        <Popuploading show={popload} setshow={closepopload}/>
        <Alertshow txt={text} show={popalert} onHide={closealert} />
        </div>

    )
}

export default Forget2