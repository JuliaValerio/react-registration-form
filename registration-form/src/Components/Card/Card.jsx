import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Frameform from '../Frameform/Frameform';
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Card.css";

const Card = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <>
     <React.StrictMode>
      <Modal
      show={show} onHide={handleClose}
      closeButton
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
      <Modal.Header closeButton>
          <Modal.Title><h2> <FontAwesomeIcon className="icons" icon={faUsers} /><FontAwesomeIcon icon="coffee" /> Cadastre um novo usuario !</h2></Modal.Title>
        </Modal.Header>
        <div>
        <Frameform />
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