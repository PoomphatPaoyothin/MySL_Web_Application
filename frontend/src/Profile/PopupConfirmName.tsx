import React, { useEffect, useState } from "react";
import { Button, Container, FormControl, InputGroup, Modal, Row } from "react-bootstrap";
import ProfileService from "./ProfileService";




const PopupConfirmName = (props:any) => {

    const [shows, setShows] = useState<boolean>(false);
    const [pass,setPass] = useState<string>('')

    const passwordinput=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setPass(e.target.value);
    }

    const closeHandler = (e: any) => {
        setShows(false);
        props.onClose(false)
    };

    const confirmName=async ()=>{
        const obj = {
            User_password:pass
        }
        let tmp1 = await ProfileService.PostOldPasword(obj,props.id)
        if(tmp1)
        {
            const changeNameObj = {
                User_prefix_name: props.prefix,
                User_name:props.username,
                User_surname:props.surname
            }
            ProfileService.patchName(changeNameObj,props.id)
        }
        else{
            alert('รหัสผ่านผิด ลองใหม่อีกครั้ง')
        }}

  
    useEffect(() => {
        console.log('show inside is', props.show)
        setShows(props.show);
    }, [props.show]);
  
    return (
      <div>
        {/* <div className='popupboxName'>
            <span className='closeName' onClick={closeHandler}>
            &times;
            </span>
            <input value={pass} onChange={passwordinput} placeholder="ใส่รหัสผ่านยืนยัน" type='password' required />
            <button onClick={confirmName}>ยืนยันเปลี่ยนชื่อผู้ใช้</button>
        </div> */}


        <Modal show={shows} backdrop="static">
            <Modal.Header>
                <Modal.Title>
                    คุณต้องการจะเปลี่ยนรหัสผ่านใช่หรือไม่
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <InputGroup className="mb-3">
                    <FormControl
                    aria-label="Default"
                    onChange={passwordinput}
                    type='password' 
                    autoComplete="off"
                    />
                    <Button onClick={confirmName}>ยืนยัน</Button>
                    <Button onClick={closeHandler} variant='danger'>ยกเลิก</Button>
                    </InputGroup>
                </Row>

            </Modal.Body>
            {/* <input value={pass} onChange={passwordinput} autoComplete="off" placeholder="ใส่รหัสผ่านยืนยัน" type='password' required/> */}

        </Modal>

        
      </div>
    );
  };
  


export default PopupConfirmName