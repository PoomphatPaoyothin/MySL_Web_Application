import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import RegisterService from "./RegisterService";

const EmailPass = (props:any) =>{
    const history=useHistory()
    const [otp,setOtp] = useState<string>()
    const [userinfo,setUserinfo] = useState<any>()
    const myid = localStorage.getItem('id');
    const id = props.match.params.id;


    const otp_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setOtp(e.target.value);
    }
    const gotonext=()=>{
        const obj = {
            otp:otp
        }
        RegisterService.postotp(id, obj)
        .then(res=>{
            console.log(res)
            if(res == true)
            {
                alert('สมัครสำเร็จ')
                history.push(`/register/3/${id}`)
            }
            else
            {
                alert('เกิดข้อผิดพลาด')
            }
        })
    }
    const resendOTP=()=>{

    }

    const checkid=()=>{
        if(userinfo != undefined)
        {
            return id == myid && userinfo.register_stat==1
        }
    }

    
    useEffect(()=>{
        if(userinfo != undefined)
        {
            if(userinfo.register_stat == 2)
            {
                history.push(`/register/3/${myid}`)
            }
            else if(userinfo.register_stat == 3)
            {
                history.push(`/`)
            }
        }

    },[userinfo])


    useEffect(()=>{
        checkid()
    },[userinfo])

    useEffect(()=>{
        RegisterService.fetchuserprofile(myid)
        .then(res=>{
            setUserinfo(res)
        })
    },[])
    return(
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
            {
                checkid() &&
                <div>
                    ป้อนนหัสยืนยันจากอีเมลล์
                    เราได้ทำการส่งรหัสยืนยันไปยังอีเมลล์ของคุณ
                    <input value={otp} type={'password'} onChange={otp_input} placeholder="ยืนยันรหัสผ่าน" required />
                    <div onClick={resendOTP}>ส่งรหัสยืนยันอีกครั้ง</div>
                    <button  onClick={gotonext}>ต่อไป</button>
                </div>
            }

        </div>
    )
}

export default EmailPass