import React, { useEffect, useState } from "react";
import { Modal, Button, ModalBody } from "react-bootstrap";
import './Lesson.css'
const Popuploading = (props:any) => {

    return (
      <Modal show={props.show} onHide={props.handleClose} animation={true} fullscreen={true}>
        <Modal.Header closeButton >
          <Modal.Title>วิธีการเรียน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className='pictutorial' src='https://cdn.discordapp.com/attachments/912175328066142240/950717416760037437/unknown.png'/>
        </Modal.Body>
        <div className='howtolearn'>
            1.ท่าเริ่มต้นคือนำมือวางไว้ที่ตัก
            2.เมื่อเริ่มอัดให้ทำท่า
            3.หลังจาก
        </div>

      </Modal>
    ); 
  };



export default Popuploading