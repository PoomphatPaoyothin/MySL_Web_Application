import React, { useState } from "react";
import { useHistory } from "react-router";

const Forget2 = (props:any) =>{
    const history=useHistory()
    const [otp,setOtp] = useState<string>()



    const otp_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setOtp(e.target.value);
    }
    const gotonext=()=>{
        history.push('/register/3')
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

export default Forget2