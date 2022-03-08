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
           <div className="howtolearn-head">ขั้นตอนการใช้งานบทเรียน</div><br/>
           <div className="centertext">
                1. ท่าเริ่มต้นคือนำมือวางไว้ที่ตัก <br/><br/>
                2. กดปุ่ม Open camera จะมีแจ้งเตือนให้กด allow camera ดังภาพ<br/>
                <img className="imgopencam" src="https://media.discordapp.net/attachments/781529051696857142/950743840829108264/unknown.png"/><br/><br/>
                2. ปรับมุมกล้องให้เรียบร้อย ควรให้เห็นบริเวณลำตัวส่วนบน<br/><br/>
                3. กดปุ่ม Start recording เพื่อเริ่มการทำท่าทาง <br/><br/>
                4. มีเวลาให้เตรียมท่าทาง 3 วินาที จากนั้นระบบจะทำการบันทึก <br/>ท่าทางของผู้ใช้เพื่อนำไปประมวลผล<br/> โดยมีเวลาให้ 5 วินาทีในการทำท่าทาง <br/><br/>
                5. เมื่อทำท่าทางเสร็จ ระบบจะทำการประมวลผล <br/>และคืนผลลัพธ์ให้ผู้ใช้งาน (ถูกต้อง/ไม่ถูกต้อง)
           </div>
        </div>
      </Modal>
    ); 
  };



export default Popuploading