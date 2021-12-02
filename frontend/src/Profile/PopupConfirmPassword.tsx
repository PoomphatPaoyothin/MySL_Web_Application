import React, { useEffect, useState } from "react";
import ProfileService from "./ProfileService";

const PopupConfirmPassword=(props:any)=>{
    const [show,setShow] = useState<boolean>(false)

    const closeHandler = (e: any) => {
        setShow(false);
        props.onClose(false)
      };
    
    const submitPass=async () =>
    {
        const changepassObj = 
        {
            password:props.newpass
        }
        ProfileService.patchPasword(changepassObj,props.id)
        props.setOldpass('');
        props.setNewpass('');
        props.setComfirmNewpass('');
    }
        

    



    useEffect(() => {
        setShow(props.show);
      }, [props.show]);

      
    return(
        <div
        style={{
          visibility: show ? "visible" : "hidden",
          opacity: show ? "1" : "0"
        }} className = 'overlayName'>
            <div className='popupboxPass'>
                <span className='close' onClick={closeHandler}>
                &times;
                </span>
                <button onClick={submitPass}>คุณต้องการจะเปลี่ยนรหัสผ่านใช่หรือไม่</button>
            </div>
        </div>
    )
}
export default PopupConfirmPassword