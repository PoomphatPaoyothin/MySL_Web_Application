import React, {useEffect, useState} from "react";
import { useHistory } from "react-router";
import './Sign_in.css';
import logo from '../../Picture/Login/logo.png';
import login_facebook from '../../Picture/Login/login with facebook.png'
import login_google from '../../Picture/Login/login with google.png'
import { stringify } from "querystring";
import AuthService from "./AuthService";

const Sign_in = () => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [errormessage, setErrormessage] = useState('');
  const history = useHistory();

  const login = async () =>{
    console.log('go login');
    const email_pass = {
      email: email,
      pass: pass,
    };
    const result = await AuthService.LoginUser(email_pass.email, email_pass.pass);
    console.log('result' , result);

    if(!result){
      setErrormessage("อีเมลล์ หรือ รหัสผ่านผิด กรุณาลองใหม่อีกครั้ง");
    }
    else{
      setErrormessage("");
      // window.location.reload();
      history.push("/");
    }
    
  }


  const forget_pass=() =>{

  }

  const regist=() => {
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
            <img src={logo} className='logo'/>
            <div className = 'mySL_pos'>
            MySL
            </div>
            <hr className = 'line_left'/>
            <div className = 'web_pos'>
                เว็ปไซต์เรียนภาษามือออนไลน์
            </div>
        </div>

        <div className='right_login'>
          <div className = 'right_login2'>
          <div>
            <input value={email} onChange={email_input} placeholder="อีเมลล์" required className="email_box"/>
            <input type='password' value={pass} onChange={pass_input} placeholder="รหัสผ่าน" required className="pass_box"/>
            <button type="submit" className='login_button' onClick={login}>เข้าสู่ระบบ</button>

            <div className='keep_me'>
              <input type="checkbox" className='checkbox'/>
              <div className="keepme_text">
               ให้ฉันอยู๋ในระบบต่อไป
              </div>
            </div>

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
            <img src={login_google} className='login_google'/>

            <img src={login_facebook} className='login_facebook'/>
            <hr className = 'line_right'/>
            <button type="button" className='regist' onClick={regist}>สมัครบัญชีใหม่</button>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Sign_in;