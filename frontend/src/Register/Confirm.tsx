import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import RegisterService from "./RegisterService";
import "./register.css"
import { Alert, Button } from "react-bootstrap";
import Alertshow from "../Profile/Alertshow";
import Popuploading from "../Loadingpop/PopupLoading";

const EmailPass = (props: any) => {
    const history = useHistory()
    const [otp, setOtp] = useState<string>()
    const [userinfo, setUserinfo] = useState<any>()
    const myid = localStorage.getItem('id');
    const id = props.match.params.id;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [text, setText] = useState('')
    const [myid2,setMyid2] = useState<any>();

    const [show_pop, setShow_pop] = useState(false);
    const handleClose_pop = () => setShow(false);

    const otp_input = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    }
    const gotonext = () => {
        setShow_pop(true)
        const obj = {
            otp: otp
        }
        RegisterService.postotp(id, obj)
            .then(res => {
                console.log(res)
                setShow_pop(false)
                if (res == true) {
                    setShow(true)
                    setText('ยืนยัน OTP สำเร็จ')
                    history.push(`/register/3/${id}`)
                }
                else {
                    setShow(true)
                    setText('โปรดกรอก OTP ให้ถูกต้อง')
                }
            })
    }
    const resendOTP=()=>{
        setShow_pop(true)
        RegisterService.resendOTP(myid)
        .then(res=>{
            if(res)
            {
                setShow_pop(false)
                setShow(true)
                setText('ได้ทำการส่ง OTP อีกครั้งแล้ว')
            }
            else{
                setShow_pop(false)
                setShow(true)
                setText('ไม่มีมีอีเมล์นี้')
            }
        })
    }

    const checkid = () => {
        if (userinfo != undefined) {
            return id == myid && userinfo.register_stat == 1
        }
    }


    useEffect(() => {
        if (userinfo != undefined) {
            if (userinfo.register_stat == 2) {
                history.push(`/register/3/${myid}`)
            }
            else if (userinfo.register_stat == 3) {
                history.push(`/`)
            }
        }

    }, [userinfo])

    const cancle = () => {
        localStorage.clear()
        history.push('/')
    }
    console.log('id', id)
    useEffect(()=>{
        setMyid2(localStorage.getItem('id'))
    },[])

    useEffect(() => {
        checkid()
    }, [userinfo])

    useEffect(() => {
        if(myid2)
        {
            RegisterService.fetchuserprofile(myid2)
            .then(res => {
                if(res)
                {
                    setUserinfo(res)
                }
            })
        }
    }, [myid2])

    console.log('userinfo ',userinfo);
    console.log('myid2 ',myid2);

    return (
        <div className="container">
            <head>
                <script type="text/javascript">
                    function preventBack() {
                        window.history.forward()
                    }

                    setTimeout("preventBack()", 0);

                    window.onunload = function () {null};
                </script>
            </head>
            {
                checkid() &&
                <div className="fontconfirm">
                    <p className="confirmtext1">ป้อนรหัสยืนยันจากอีเมล</p><br/>
                    <p className="confirmtext2">เราได้ทำการส่งรหัสยืนยันไปยังอีเมลของคุณ</p>
                    <div className="middle">
                    <input value={otp} onChange={otp_input} placeholder="รหัสยืนยันอีเมล" className="inputotp" required />
                    </div>
                    <div onClick={resendOTP} className="resendotp">ส่งรหัสยืนยันอีกครั้ง</div>
                    <div className="middle">
                        <Button onClick={cancle} className="cancelotp" variant="danger">ยกเลิก</Button>
                        <Button onClick={gotonext} className="submitotp">ต่อไป</Button>
                    </div>
                    

                </div>
            }
            <Alertshow txt={text} show={show} onHide={handleClose}/>
            <Popuploading show = {show_pop} setshow={handleClose_pop}/>
            
        </div>
    )
}

export default EmailPass