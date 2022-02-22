import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";

const PopupconfirmQuiz=(props:any)=>{
    const [show,setShow] = useState<boolean>(false)
    const history=useHistory()  
    console.log()
    const closeHandler = () => {
        setShow(false);
        props.onClose()
      }
    const goquiz=()=>{
      setShow(false);
      props.onClose()
      props.getStart(true)
      props.isFinishHandle(false)
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
                คุณต้องการจะสอบใหม่หรือไม่?
                <button onClick={goquiz}>ตกลง</button>
                <button onClick={closeHandler}>ยกเลิก</button>
            </div>
        </div>
    )
}
export default PopupconfirmQuiz