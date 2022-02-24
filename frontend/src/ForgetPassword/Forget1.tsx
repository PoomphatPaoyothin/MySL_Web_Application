import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ForgetService from "./ForgetService";
import Popuploading from "../Loadingpop/PopupLoading";
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import './forgetpass.css'

const Forget1 = (props:any) =>{
    const history=useHistory()
    const [email,setEmail] = useState<string>()
    const  {promiseInProgress}  = usePromiseTracker()


    const email_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
      }

    const gotonext=()=>{
        const obj={
            email:email
        }
        trackPromise(
        ForgetService.patchemail(obj)
        .then(res=>{
            console.log('res is',res)
            if(res)
            {
                if(email!=undefined)
                {
                    localStorage.removeItem('email')
                    localStorage.setItem('email',email)
    
                    history.push('/forgetpass/2')
                }

            }
            else{
                alert('ไม่มีอีเมลล์นี้')
            }
        }))
    }

    useEffect(()=>{
        if(localStorage.getItem('id') != undefined)
        {
            history.push(`/forgetpass/3/${localStorage.getItem('id')}`)
        }
    },[])

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

                <button  onClick={gotonext} className="nextbutton">ต่อไป</button>
                {
                promiseInProgress && 
                <Popuploading/>
                }
            </div> 

            }

        </div>
    )
}

export default Forget1