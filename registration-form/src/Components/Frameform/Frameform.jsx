import React, { useState } from "react"
import { useStorage } from '../../Hooks/useStorage'
import "./Form.css";
import { Button, Form } from 'react-bootstrap/'

const Formulario = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const types = ["image/png", "image/jpeg", "image/jpg"];

    const handleChange = (e) => {
        let selectedFile = e.target.files[0];

        if (selectedFile) {
            if (types.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
            } else {
                setFile(null);
                setError("Please select an image file (png or jpg)");
            }
        }
    };

    const onSubmit = e => {
        console.log("funciona")
        // e.preventDefault()
        // firebase
        //     .firestore()
        //     .collection("users")
        //     .add({
        //         name,
        //         age,
        //         cpf,
        //         status,
        //         city,
        //         uf,
        //     })
        //     .then(() => setName(""), setAge(""), setCpf(""), setStatus(""), setCity(""), setUf(""))
    }


    const { progress, url } = useStorage(file);

    return (
        <>
            <Form className="container" onSubmit={onSubmit} >
                <div className="picture-card">
                    <Form.Group controlId="formBasicPicture">
                        <Form.Label></Form.Label>
                        <Button
                            className='mt-5 my-3'
                            type="file" onChange={handleChange}
                            variant="primary" >
                            Carregar sua foto
                        </Button>
                        <div>
                            {/* error message */}
                            {error && <p>{error}</p>}

                            {/* upload progress */}
                            {file && <p>{progress}% uploaded</p>}

                            {/* image url */}
                            {url && (
                                <p>
                                    <b>File url: </b>
                                    <a href={url}>{url}</a>
                                </p>
                            )}

                            {/* image display */}
                            {url && <img alt="" src={url}></img>}
                        </div>
                    </Form.Group>
                </div>
                <span className='line'></span>
                <div className="info-card">
                    {/* <Form.Group controlId="formBasicName">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            value={name}
                            name="name"
                            onChange={e => setName(e.currentTarget.value)}
                            type="text"
                            placeholder="Nome" />
                    </Form.Group>

                    <Form.Group controlId="formBasicIdade">
                        <Form.Label>Idade</Form.Label>
                        <Form.Control
                            placeholder="Idade"
                            value={age}
                            name="age"
                            onChange={e => setAge(e.currentTarget.value)}
                            type="number" />
                    </Form.Group>

                    <Form.Group controlId="formBasicCpf">
                        <Form.Label>cpf</Form.Label>
                        <Form.Control
                            placeholder="cpf"
                            value={cpf}
                            name="cpf"
                            onChange={e => setCpf(e.currentTarget.value)}
                            type="number" />
                    </Form.Group>

                    <Form.Group controlId="formBasicStatus">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control
                            placeholder="uf"
                            value={uf}
                            name="uf"
                            onChange={e => setUf(e.currentTarget.value)}
                            type="text"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicCity">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control
                            placeholder="Cidade"
                            value={city}
                            name="city"
                            onChange={e => setCity(e.currentTarget.value)}
                            type="text" />
                    </Form.Group>

                    <Form.Group controlId="formBasicUf">
                        <Form.Label>Estado civil</Form.Label>
                        <Form.Control
                            placeholder="status"
                            value={status}
                            name="status"
                            onChange={e => setStatus(e.currentTarget.value)}
                            type="text"
                        />
                    </Form.Group> */}
                    <Button
                        variant="success" type="submit">
                        salvar
                    </Button>
                </div>
            </ Form >
        </>
    )
}

export default Formulario