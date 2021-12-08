import React, { useState } from "react";
import { useHistory } from "react-router";

const Forget1 = (props:any) =>{
    const history=useHistory()
    const [email,setEmail] = useState<string>()


    const email_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
      }

    const gotonext=()=>{
        history.push('/forgetpass/2')
    }

    return(
        <div>
            <input value={email}  onChange={email_input} placeholder="อีเมลล์" required />
            <button  onClick={gotonext}>ต่อไป</button>
        </div>
    )
}

export default Forget1