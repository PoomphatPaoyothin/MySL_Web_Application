import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const PopupconfirmQuiz=(props:any)=>{
    const [show,setShow] = useState<boolean>(false)
    const history=useHistory()  
    console.log()
    const closeHandler = () => {
        setShow(false);
        props.onClose()
      }
    const goquiz=()=>{
      props.getStart(true)
      props.isFinishHandle(false)
    }

    useEffect(() => {
        setShow(props.show);
      }, [props.show]);

      
    return(
        // <div
        // style={{
        //   visibility: show ? "visible" : "hidden",
        //   opacity: show ? "1" : "0"
        // }} className = 'overlayName'>
        //     <div className='popupboxPass'>
        //         คุณต้องการจะสอบใหม่หรือไม่?
        //         <button onClick={goquiz}>ตกลง</button>
        //         <button onClick={closeHandler}>ยกเลิก</button>
        //     </div>
        // </div>
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              แจ้งเตือน!
            </Modal.Title>
          </Modal.Header>
              <Modal.Body>
                <h4>คุณต้องการจะสอบใหม่หรือไม่</h4>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={goquiz} variant='primary'>ตกลง</Button>
                <Button onClick={props.close} variant='danger'>ยกเลิก</Button>
              </Modal.Footer>
        </Modal>
    )
}
export default PopupconfirmQuiz