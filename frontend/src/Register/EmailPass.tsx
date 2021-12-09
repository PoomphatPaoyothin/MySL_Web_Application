import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import RegisterService from "./RegisterService";

const Confirm = (props:any) =>{
    const history=useHistory()
    const [email,setEmail] = useState<string>()
    const [pass,setPass] = useState<string>()
    const [confirmpass,setConfirmpass] = useState<string>()
    const myid =localStorage.getItem('id')
    const [userinfo,setUserinfo] = useState<any>()



    const email_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
      }
    const pass_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setPass(e.target.value);
    }
    const confirmpass_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setConfirmpass(e.target.value);
    }
    const gotonext=()=>{
        if(pass == confirmpass)
        {
            const obj = {
                User_email:email,
                User_password:pass
            }
            RegisterService.postemailpass(obj)
            .then((res: any)=>{
                console.log('ressss',res)

                if(res.userId == undefined)
                {
                    alert(res.message)
                }
                else
                {
                    console.log(res.userId)
                    localStorage.setItem("accesToken", res.accessToken);
                    localStorage.setItem("id", res.userId);
                    alert('ได้ทำการส่ง OTP ไปที่ email อาจจะอยู่ที่ spam')
                    history.push(`/register/2/${res.userId}`)
                }
            })
        }
        else{
            alert('รหัสผ่านไม่ตรงกัน')
        }

    }

    
    const checkid = ()=>{
        return myid == undefined
    }
///////////////////////////////////////////////////////////////////////////////////
    useEffect(()=>{
        RegisterService.fetchuserprofile(myid)
        .then(res=>{
            setUserinfo(res)
        })
    },[])
    

    useEffect(()=>{
        if(userinfo !=undefined)
        {
            if(userinfo.register_stat == 1)
            {
                history.push(`/register/2/${myid}`)
            }
            else if(userinfo.register_stat == 2)
            {
                history.push(`/register/3/${myid}`)
            }
            else if(userinfo.register_stat == 3)
            {
                history.push(`/`)
            }
        }

    },[userinfo])
///////////////////////////////////////////////////////////////////////////////////

    useEffect(()=>{
        checkid()
    },[userinfo])


    return(
        <div>
            {
                checkid() &&
                <div>
                <head>                
                    <script type="text/javascript">
                        function preventBack() {
                            window.history.forward()
                        }
                        
                        setTimeout("preventBack()", 0);
                        
                        window.onunload = function () { null };
                    </script>
                </head>

                <input value={email}  onChange={email_input} placeholder="อีเมลล์" required />
                <input value={pass} type={'password'} onChange={pass_input} placeholder="รหัสผ่าน" required />
                <input value={confirmpass} type={'password'} onChange={confirmpass_input} placeholder="ยืนยันรหัสผ่าน" required />
                <button  onClick={gotonext}>ต่อไป</button>
                </div>
            }

        </div>
    )
}

export default Confirm