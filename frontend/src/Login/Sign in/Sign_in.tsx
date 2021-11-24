import React, {useEffect, useState} from "react";
import './Sign_in.css';
import logo from '../../Picture/logo.png';
import login_facebook from '../../Picture/Login/login with facebook.png'
import login_google from '../../Picture/Login/login with google.png'
import { stringify } from "querystring";

const Sign_in = () => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [message, setMessage] = useState('');

  const login =() =>{
    const email_pass = {
      email: email,
      pass: pass,
    };

    // fetch("http://localhost:3000/word",{
    //   method: 'POST',
    //   header: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(email_pass),
    // })

    // .then(res => (alert(res)));
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
            <input value={pass} onChange={pass_input} placeholder="รหัสผ่าน" required className="pass_box"/>
            <button type="submit" className='login_button' onClick={login}>เข้าสู่ระบบ</button>

            <div className='keep_me'>
              <input type="checkbox" className='checkbox'/>
              <label className="keepme_text">
               ให้ฉันอยู๋ในระบบต่อไป
              </label>
            </div>

            <div className="forget_pass" >
              <label onClick={forget_pass} className='forget_pass_text'> 
                ลืมรหัสผ่าน
              </label>
            </div>

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