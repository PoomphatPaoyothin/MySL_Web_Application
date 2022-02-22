import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import RegisterService from "./RegisterService";
import "./register.css"

const EmailPass = (props: any) => {
    const history = useHistory()
    const [otp, setOtp] = useState<string>()
    const [userinfo, setUserinfo] = useState<any>()
    const myid = localStorage.getItem('id');
    const id = props.match.params.id;


    const otp_input = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    }
    const gotonext = () => {
        const obj = {
            otp: otp
        }
        RegisterService.postotp(id, obj)
            .then(res => {
                console.log(res)
                if (res == true) {
                    alert('ยืนยัน OTP สำเร็จ')
                    history.push(`/register/3/${id}`)
                }
                else {
                    alert('เกิดข้อผิดพลาด')
                }
            })
    }
    const resendOTP = () => {

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

    useEffect(() => {
        checkid()
    }, [userinfo])

    useEffect(() => {
        RegisterService.fetchuserprofile(myid)
            .then(res => {
                setUserinfo(res)
            })
    }, [])
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
                        <button onClick={cancle} className="cancelotp">ยกเลิก</button>
                        <button onClick={gotonext} className="submitotp">ต่อไป</button>
                    </div>
                    

                </div>
            }

        </div>
    )
}

export default EmailPass