import React, { useState } from "react";
import { useHistory } from "react-router";
import ForgetService from "./ForgetService";

const Forget3 = (props:any) =>{
    const history=useHistory()
    const [pass,setPass] = useState<string>()
    const [Confirmpass,setConfirmpass] = useState<string>()
    const myid = localStorage.getItem('id')

    const confirmpass_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setConfirmpass(e.target.value);
      }
    const pass_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setPass(e.target.value);
    }
    const gotonext=()=>{
        if(pass == Confirmpass)
        {
            const obj={
                password:pass
            }
            ForgetService.changepassword(obj)
            history.push('/')
        }
        else{
            alert('กรุณาใส่รหัสผ่านให้ตรงกัน')
        }

    }

    const skip=()=>{
        history.push('/')
    }

    return(
        <div>
            <input value={pass} type={'password'}  onChange={pass_input} placeholder="รหัสผ่าน" required />
            <input value={Confirmpass} type={'password'}   onChange={confirmpass_input} placeholder="ยืนยันรหัสผ่าน" required />
            <button  onClick={gotonext}>ยืนยัน</button>
            <button  onClick={skip}>ข้าม</button>
        </div>
    )
}

export default Forget3