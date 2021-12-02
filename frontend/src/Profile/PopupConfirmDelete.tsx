import React, { useEffect, useState } from "react";
import ProfileService from "./ProfileService";




const PopupConfirmDelete = (props:any) => {
    const [show, setShow] = useState<boolean>(false);
    const [pass,setPass] = useState<string>('')

    const passwordinput=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setPass(e.target.value);
    }

    const closeHandler = (e: any) => {
      setShow(false);
      props.onClose(false)
    };

    const Delete=async ()=>{
        const obj = {
            User_password:pass
        }
        let tmp1 = await ProfileService.PostOldPasword(obj,props.id)
        if(tmp1)
        {
            let tmp2 = await ProfileService.Delete(props.id)
            
            if(tmp2)
            {
                alert('ผู้ใช้ถูกลบออก')
                setShow(false)
            }
            else
            {
                alert('ผิดพลาด')
            }
        }
        else{
            alert('รหัสผ่านผิด ลองใหม่อีกครั้ง')
        }}

  
    useEffect(() => {
      console.log('delete inside is',props.show)
      setShow(props.show);
    }, [props.show]);
  
    return (
      <div
        style={{
          visibility: show ? "visible" : "hidden",
          opacity: show ? "1" : "0"
        }} className = 'overlay'>
        <div className='popupbox'>
            <span className='close' onClick={closeHandler}>
            &times;
            </span>
            <input value={pass} onChange={passwordinput} placeholder="ใส่รหัสผ่านยืนยัน" type='password' required />
            <button onClick={Delete}>ยืนยันลบข้อมูลผู้ใช้</button>
        </div>
      </div>
    );
  };



export default PopupConfirmDelete