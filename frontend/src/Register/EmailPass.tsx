import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import RegisterService from "./RegisterService";
import Popuploading from "../Loadingpop/PopupLoading";
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import './register.css'
import { Button } from "react-bootstrap";
import Alertshow from "../Profile/Alertshow";

const Confirm = (props:any) =>{
    const history=useHistory()
    const [email,setEmail] = useState<string>()
    const [pass,setPass] = useState<string>()
    const [confirmpass,setConfirmpass] = useState<string>()
    const myid =localStorage.getItem('id')
    const [userinfo,setUserinfo] = useState<any>()
    const [text, setText]=useState('')
    const  {promiseInProgress}  = usePromiseTracker()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [myid2,setMyid2] = useState<any>();
    const [show_alert, setShow_alert] = useState(false)
    const handleClose_alert = () => setShow_alert(false);

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
            setShow(true)
            const obj = {
                User_email:email,
                User_password:pass
            }
            RegisterService.postemailpass(obj)
            .then((res: any)=>{
                if(res.userId == undefined)
                {
                    setShow(false)
                    
                    if(res.message == 'email already exist')
                    {
                        setShow_alert(true)
                        setText("อีเมลล์ ถูกใช้ไปแล้ว")
                    }

                }
                else
                {
                    localStorage.setItem("accesToken", res.accessToken);
                    localStorage.setItem("id", res.userId);
                    setShow(false)

                    setShow_alert(true)
                    setText('ได้ทำการส่ง OTP ไปที่ email อาจจะอยู่ที่ spam')
                    // alert('ได้ทำการส่ง OTP ไปที่ email อาจจะอยู่ที่ spam')
                    history.push(`/register/2/${res.userId}`)
                }
            })
        }
        else{
            setText('รหัสผ่านไม่ตรงกัน')
            setShow_alert(true)
            // alert('รหัสผ่านไม่ตรงกัน')
        }

    }

    
    const checkid = ()=>{
        return myid == undefined
    }
///////////////////////////////////////////////////////////////////////////////////
    useEffect(()=>{
        setMyid2(localStorage.getItem('id'))
    },[])

    useEffect(()=>{
        if(myid2)
        {
            RegisterService.fetchuserprofile(myid2)
            .then(res=>{
                setUserinfo(res)
            })
        }
    },[myid2])
    

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
    const cancel=()=>{
        history.push('/')
    }

    return(
        <div className="container">
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
                
                    <p className="textemailpass">กรุณากรอกอีเมลและรหัสผ่าน</p>
                    <div className="inputtext">
                        <input value={email} autoComplete="nope"  className = "inputemail1" onChange={email_input} placeholder="อีเมล" required />
                        <br/>
                        <input value={pass} autoComplete="nope"  className="inputpass"  type={'password'} onChange={pass_input} placeholder="รหัสผ่าน" required />
                        <br/>
                        <input value={confirmpass} autoComplete="nope"  className="inputconfirmpass" type={'password'} onChange={confirmpass_input} placeholder="ยืนยันรหัสผ่าน" required />
                        <br/>
                        <div>
                        <Button  onClick={cancel} className="canclebutton" variant='danger'>ยกเลิก</Button>
                        <Button  onClick={gotonext} className="nextbuttonnew">ต่อไป</Button>
                        </div>
                        {/* {
                        promiseInProgress && 
                        <Popuploading show = {show}/>
                        } */}
                        <Popuploading show = {show} setshow={handleClose}/>
                        <Alertshow txt={text} show={show_alert} onHide={handleClose_alert}/>
                        
                    </div>
                </div>
            }

        </div>
    )
}

export default Confirm


