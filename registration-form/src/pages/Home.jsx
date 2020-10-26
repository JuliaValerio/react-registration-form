import React, { useState } from 'react';
import firebase from "firebase/app"
import './Home.css';
import UpdateItem from '../Components/UpdateUser/UpdateUser'
import UserList from '../Components/UsersList/UsersList'
import { Modal } from "react-bootstrap";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const initialItemState = [
        { id: null, firstName: "", lastName: "", age: "", email: "", phone: "", sendNews: "", uf: "", url: "" },
    ]

    const [editing, setEditing] = useState(false)

    const [currentItem, setCurrentItem] = useState(initialItemState)

    const editItem = (item) => {
        setEditing(true)
        setCurrentItem({
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            age: item.age,
            email: item.email,
            phone: item.phone,
            sendNews: item.sendNews,
            uf: item.uf,
            url: item.url,
        })
    }

    const updateItem = ({ currentItem }, updatedItem) => {
        console.log(
            "It sends the item to the updated item function:",
            updatedItem,
            currentItem.id
        );
        //When the Update button is pressed, it turns off editing
        setEditing(false)
        firebase
            .firestore()
            .collection("users")
            .doc(currentItem.id)
            .update(updatedItem);
    };

    return (
        <div className="container">
            <div>
                {editing ? (
                    <Modal
                        show={!show} onHide={handleClose}
                        {...props}
                        size="lg"
                        className="modal"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Body>
                            <Modal.Header>
                                <Modal.Title><h2> <FontAwesomeIcon className="icons" icon={faUsers} /><FontAwesomeIcon icon="coffee" /> Atualize os dados do usuario !</h2></Modal.Title>
                            </Modal.Header>
                            <UpdateItem
                                setEditing={setEditing}
                                currentItem={currentItem}
                                updateItem={updateItem}
                            />
                        </Modal.Body>
                    </Modal>
                ) : (
                    <div>
                    <UserList className="list" editItem={editItem} />
                </div>
    
                    )}
            </div>

        </div>
    )
}

export default Home;