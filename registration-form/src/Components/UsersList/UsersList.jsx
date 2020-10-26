import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const useItems = () => {
    const [items, setItems] = useState([])
    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection("users")
            .onSnapshot(snapshot => {

                const listItems = snapshot.docs.map(doc => ({

                    id: doc.id,
                    ...doc.data()
                }));
                setItems(listItems);
            });
        return () => unsubscribe();

    }, []);
    return items
};

const deleteItem = (id) => {
    firebase
        .firestore()
        .collection("users")
        .doc(id)
        .delete()
}

const UsersList = ({ editItem }) => {
    const listItem = useItems();

    return (

        <Table striped bordered hover>
            <tbody>
                <tr>
                    <td className="tg-ycr8">Foto</td>
                    <td className="tg-a04x">Descrição</td>
                    <td className="tg-a04x"></td>
                    <td className="tg-a04x"></td>
                </tr>
            </tbody>
            {listItem.map((item) => (
                <tbody key={item.id}>
                    <tr>
                        <td className="tg-ycr8"> <img alt="foto do perfil" src={item.url}></img> </td>
                        <td className="tg-a04x">
                            <p className="description">Olá sou <strong>{item.firstName}</strong> <strong>{item.lastName}</strong>, e tenho <strong>{item.age}</strong> anos, e você pode enviar e-mails para <strong>{item.email}</strong>. Moro no estado <strong>{item.uf}</strong>. Por favor me envie newslletter. Para me contatar ligue no telefone <strong>{item.phone}</strong></p>
                        </td>

                        <td className="tg-ycr8">
                            <Button
                                className="mt-5"
                                variant="danger"
                                onClick={() => deleteItem(item.id)}>
                                Remover
                            </Button></td>
                        <td className="tg-ycr8">
                            <Button
                                className="mt-5"
                                variant="warning"
                                onClick={() => editItem(item)}
                            >
                                Editar
                            </Button></td>

                    </tr>
                </tbody>
            ))}
        </Table>
    );
};
export default UsersList;