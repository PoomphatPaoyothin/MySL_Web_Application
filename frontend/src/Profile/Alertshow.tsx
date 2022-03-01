import { Button, Modal } from "react-bootstrap"


const Alertshow=(props:any)=>{
    return(
        <Modal show={props.show} onHide={props.onHide} animation={false} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>แจ้งเตือน!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.txt}</Modal.Body>

      </Modal>
    )
}

export default Alertshow;