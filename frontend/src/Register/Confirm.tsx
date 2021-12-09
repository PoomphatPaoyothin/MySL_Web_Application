import React, { useState } from "react";
import { useHistory } from "react-router";
import RegisterService from "./RegisterService";

const EmailPass = (props:any) =>{
    const history=useHistory()
    const [otp,setOtp] = useState<string>()
    const myid = localStorage.getItem('id');



    const otp_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setOtp(e.target.value);
    }
    const gotonext=()=>{
        const obj = {
            otp:otp
        }
        RegisterService.postotp(myid, obj)
        .then(res=>{
            console.log(res)
            if(res == true)
            {
                alert('สมัครสำเร็จ')
                history.push('/register/3')
            }
            else
            {
                alert('เกิดข้อผิดพลาด')
            }
        })
    }
    const resendOTP=()=>{

    }
    return(
        <div>
            ป้อนนหัสยืนยันจากอีเมลล์
            เราได้ทำการส่งรหัสยืนยันไปยังอีเมลล์ของคุณ
            <input value={otp} type={'password'} onChange={otp_input} placeholder="ยืนยันรหัสผ่าน" required />
            <div onClick={resendOTP}>ส่งรหัสยืนยันอีกครั้ง</div>
            <button  onClick={gotonext}>ต่อไป</button>
        </div>
    )
}

export default EmailPass