import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Loadingpop.css";

const Popuploading = (props:any) => {

    return (
      <Modal show={props.show} setshow={props.setshow} animation={false} static={false}>
        <Modal.Header >
          <Modal.Title>แจ้งเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body>กำลังโหลดโปรดรอสักครู่..</Modal.Body>
      </Modal>
    );
  };



export default Popuploading