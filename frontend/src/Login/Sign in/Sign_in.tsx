import React, {useEffect, useState} from "react";
import { useHistory } from "react-router";
import './Sign_in.css';
import logo from '../../Picture/Login/logo.png';
import login_facebook from '../../Picture/Login/login with facebook.png'
import login_google from '../../Picture/Login/login with google.png'
import { stringify } from "querystring";
import AuthService from "./AuthService";
import FacebookLogin from 'react-facebook-login';
import Alertshow from "../../Profile/Alertshow";
import Popuploading from "../../Loadingpop/PopupLoading";

const Sign_in = () => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [errormessage, setErrormessage] = useState(false);
  const closeerror=()=>{setErrormessage(false)}
  const [text, setText] = useState('')
  const [show, setShow] = useState(false)
  const handleclose = ()=>{setShow(false)}
  const history = useHistory();

  const login = async () =>{
    setShow(true)
    const email_pass = {
      email: email,
      pass: pass,
    };
    const result = await AuthService.LoginUser(email_pass.email, email_pass.pass);
    console.log('result' , result);

    if(!result){
      setErrormessage(true)
      setText("อีเมล หรือ รหัสผ่านผิด กรุณาลองใหม่อีกครั้ง");
      setShow(false)
    }
    else{
      AuthService.fetchisdelete(result.userId)
      .then(
        res=>{
          if(res == false){
            localStorage.setItem("accesToken", result.accessToken);
            localStorage.setItem("id", result.userId);
            setShow(false)
            window.location.reload();
            history.push("/");
          }
          else{
            setErrormessage(true)
            setText("อีเมล หรือ รหัสผ่านผิด กรุณาลองใหม่อีกครั้ง");
            setShow(false)
          }
        }
      )
    }
    
  }


  const forget_pass=() =>{
    history.push('/forgetpass/1')

  }

  const regist=() => {
    history.push('/register/1')
  }

  const email_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
    setEmail(e.target.value);
  }

  const pass_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
    setPass(e.target.value);
  }

  return(
    <div className='container'>
        <div className = 'left_login'>
            {/* <img src={logo} className='logo'/> */}
            <div className = 'mySL_pos'>
            MySL
            </div>
            <hr className = 'line_left'/>
            <div className = 'web_pos'>
                เว็ปไซต์เรียนภาษามือ <br/>ออนไลน์
            </div>
        </div>

        <div className='right_login'>
          <div className = 'right_login2'>
          <div>
            <p className='loginword'>เข้าใช้งาน</p>
            <input value={email} onChange={email_input} placeholder="อีเมล" required className="email_box"/>
            <input type='password' value={pass} onChange={pass_input} placeholder="รหัสผ่าน" required className="pass_box"/>
            <button type="submit" className='login_button' onClick={login}>เข้าสู่ระบบ</button>



            <div className="forget_pass" >
              <label onClick={forget_pass} className='forget_pass_text'> 
                ลืมรหัสผ่าน
              </label>
            </div>
            {errormessage && (
              <div className='errormessagePos'>
                <p className='errormessage'>{errormessage}</p>
              </div>
            )}
            <Alertshow txt={text} show={errormessage} onHide={setErrormessage}/>

            {/* src={login_facebook}  */}
            <hr className = 'line_right'/>
            <button type="button" className='regist' onClick={regist}>สมัครบัญชีใหม่</button>
            </div>
          </div>
        </div>
        <Popuploading show={show} setshow={handleclose}/>

    </div>
  )
}

export default Sign_in;