import React, { useEffect, useState } from "react";
import { Modal, Row, InputGroup, FormControl, Button } from "react-bootstrap";
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
        <div>
            <Modal show={show} backdrop="static">
                <Modal.Header>
                    <Modal.Title>
                    คุณต้องการจะเปลี่ยนรหัสผ่านใช่หรือไม่
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <InputGroup className="mb-3">
                            <Button onClick={submitPass}>ตกลง</Button>
                            <Button onClick={closeHandler} variant='danger'>ยกเลิก</Button>
                        </InputGroup>
                    </Row>

                </Modal.Body>
            </Modal>

            {/* <div className='popupboxPass'>
                <span className='close' onClick={closeHandler}>
                &times;
                </span>
                <button onClick={submitPass}>คุณต้องการจะเปลี่ยนรหัสผ่านใช่หรือไม่</button>
            </div> */}
        </div>
    )
}
export default PopupConfirmPassword