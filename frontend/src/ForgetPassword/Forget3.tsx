import React, { useState } from "react";
import { useHistory } from "react-router";

const Forget3 = (props:any) =>{
    const history=useHistory()
    const [pass,setPass] = useState<string>()
    const [Confirmpass,setConfirmpass] = useState<string>()


    const confirmpass_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setConfirmpass(e.target.value);
      }
    const pass_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setPass(e.target.value);
    }
    const gotonext=()=>{
        history.push('/')
    }

    return(
        <div>
            <input value={pass} type={'password'}  onChange={pass_input} placeholder="อีเมลล์" required />
            <input value={Confirmpass} type={'password'}   onChange={confirmpass_input} placeholder="อีเมลล์" required />
            <button  onClick={gotonext}>ยืนยัน</button>
        </div>
    )
}

export default Forget3