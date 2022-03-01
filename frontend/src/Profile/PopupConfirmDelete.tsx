import React, { useEffect, useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Popuploading from "../Lesson/Tutorialpopup";
import ProfileService from "./ProfileService";
import PopupLoading from '../Loadingpop/PopupLoading'
import Alertshow from "./Alertshow";



const PopupConfirmDelete = (props:any) => {
    const [show, setShow] = useState<boolean>(false);
    const [pass,setPass] = useState<string>('')
    const history = useHistory();
    const [showpopupload, setShowpopupload] = useState(false)
    const handleclosepopupload=()=>{setShowpopupload(false)}

    const [alertpop, setAlertpop] = useState(false)
    const closeAlertpop=()=>{setAlertpop(false)}
    const [text, setText] = useState('')

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
        setShowpopupload(true)
        let tmp1 = await ProfileService.PostOldPasword(obj,props.id)
        if(tmp1)
        {
            let tmp2 = await ProfileService.Delete(props.id)
            if(tmp2)
            {
                setShowpopupload(false)

                setText('ผู้ใช้ถูกลบออก')
                setAlertpop(true)

                setShow(false)
                localStorage.clear();
                history.push('/');
                window.location.reload();
            }
            else
            {
                setShowpopupload(false)

                setText('ผิดพลาด')
                setAlertpop(true)
            }
        }
        else{
            setShowpopupload(false)
            setText('รหัสผิดพลาด โปรดลองใหม่อีกครั้ง...')
            setAlertpop(true)
        }}

  
    useEffect(() => {
      setShow(props.show);
    }, [props.show]);
  
    return (
      <div>
        {/* <div className='popupbox'>
            <span className='close' onClick={closeHandler}>
            &times;
            </span>
            <input value={pass} onChange={passwordinput} placeholder="ใส่รหัสผ่านยืนยัน" type='password' required />
            <button onClick={Delete}>ยืนยันลบข้อมูลผู้ใช้</button>
        </div> */}

        <Modal show={props.show} animation={false}>
        <Modal.Header >
          <Modal.Title>ลบข้อมูลผู้ใช้</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <InputGroup className="mb-3">
              <FormControl
                aria-label="Default"
                onChange={passwordinput}
                type='password' 
                autoComplete="off"
                value={pass}
                />
                <Button onClick={Delete}>ยืนยัน</Button>
                <Button onClick={closeHandler} variant='danger'>ยกเลิก</Button>
          </InputGroup>
        </Modal.Body>

      </Modal>

      <PopupLoading show={showpopupload} setshow={handleclosepopupload}/>
      <Alertshow txt={text} show={alertpop} onHide={closeAlertpop}/>
      </div>
    );
  };



export default PopupConfirmDelete