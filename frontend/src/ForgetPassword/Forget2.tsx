import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ForgetService from "./ForgetService";

const Forget2 = (props:any) =>{
    const history=useHistory()
    const [otp,setOtp] = useState<string>()
    const email = localStorage.getItem('email')


    const otp_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setOtp(e.target.value);
    }
    const gotonext=()=>{
        const obj={
            email:email,
            otp:otp 
        }
        ForgetService.checkotp(obj)
        .then(res=>{ 
            if(res.accessToken!=undefined)
            {
                localStorage.removeItem('email')
                localStorage.setItem('id',res.UserId)
                localStorage.setItem('accessToken',res.accessToken)
                history.push(`/forgetpass/3/${res.UserId}`)
                
            }
            else
            {
                alert('OTP ไม่ถูกต้องโปรดลองใหม่อีกครั้ง')
            }
        })

    }

    const resendOTP=()=>{

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
                        <input value={otp} type={'password'} className="inputemail" onChange={otp_input} placeholder="ยืนยันรหัสผ่าน" required />
                    </div>
                    <div onClick={resendOTP}>ส่งรหัสยืนยันอีกครั้ง</div>
                    <button  onClick={gotonext} className="nextbutton">ต่อไป</button>
                </div>
            </div>
        }
        </div>

    )
}

export default Forget2