import React, {useState} from "react";
import './Sign_in.css';
import logo from '../../Picture/logo.png';
import login_facebook from '../../Picture/login with facebook.png'
import login_google from '../../Picture/login with google.png'

const Sign_in = () => {
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
            <input placeholder="อีเมลล์" required className="email_box"/>
            <input placeholder="รหัสผ่าน" required className="pass_box"/>
            <button type="submit" className='login_button'>เข้าสู่ระบบ</button>
            <label className='keep_me'>
              <button className='checkbox'> </button>ให้ฉันอยู๋ในระบบต่อไป
            </label>
            <div className="forget_pass">
              <label>
                ลืมรหัสผ่าน
              </label>
            </div>

            <img src={login_google} className='login_google'/>

            <img src={login_facebook} className='login_facebook'/>
            <hr className = 'line_right'/>
            <button className='regist'>สมัครบัญชีใหม่</button>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Sign_in;