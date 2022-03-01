import React, { useEffect, useState } from "react";
import { Modal, Button, ModalBody } from "react-bootstrap";

const Popuploading = (props:any) => {

    return (
      <Modal show={props.show} onHide={props.handleClose} animation={true} fullscreen='xxl-down' >
        <Modal.Header closeButton >
          <Modal.Title>วิธีการเรียน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <img className='pictutorial' src='https://media.discordapp.net/attachments/912175328066142240/948170583592534016/274842565_1905798886270318_657248204452484620_n.jpg?width=1060&height=663'/>

        </Modal.Body>
      </Modal>
    ); 
  };



export default Popuploading