import React from "react";
import { Modal, Button } from "react-bootstrap";
//import AddForm from '../AddForm/AddForm'
import "./Card.css";

const Card = (props) => {

  return (
    <>
     <React.StrictMode>
      <Modal
      closeButton
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
      <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <div>
          {/* <AddForm /> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Cancelar</Button>
      </Modal.Footer>
    </Modal>
      </React.StrictMode>
    </>
  );
}

export default Card;