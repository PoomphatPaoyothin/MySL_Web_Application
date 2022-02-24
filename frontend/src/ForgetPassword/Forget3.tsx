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
            <div className="text1">
                กรุณากรอกรหัสผ่านใหม่ที่ท่านต้องการเปลี่ยน
            </div>
            <div className="center">
            <input value={pass} type={'password'} className="inputpass" onChange={pass_input} placeholder="รหัสผ่าน" required /><br/>
            <input value={Confirmpass} type={'password'} className="inputconfirmpass" onChange={confirmpass_input} placeholder="ยืนยันรหัสผ่าน" required />
            </div>

            <div className="center">
                <button  onClick={skip} className="skip">ข้าม</button>
                <button  onClick={gotonext} className="nextbutton">ยืนยัน</button>
            </div>
            
            
        </div>
    )
}

export default Forget3