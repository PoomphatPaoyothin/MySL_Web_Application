import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";

const PopupQuiz=(props:any)=>{
    const [show,setShow] = useState<boolean>(false)
    const history=useHistory()  

    const closeHandler = () => {
        setShow(false);
        props.onClose(false)
      }
    const goquiz=()=>{
      console.log(props.objword)
      history.push(`/quiz/${props.objword[0].Category_ID}/${props.objword[0].Lesson_ID}`)
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
                <button onClick={goquiz}>ตกลง</button>
                <button onClick={closeHandler}>ยกเลิก</button>
            </div>
        </div>
    )
}
export default PopupQuiz