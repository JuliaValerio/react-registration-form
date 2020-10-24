import React, { useState } from "react"
//import * as firebase from "firebase/app";
import { useStorage } from '../../Hooks/useStorage'
import "./Form.css";
import { Button, Form, Col, Row } from 'react-bootstrap/'
//import RangeSlider from 'react-bootstrap-range-slider';
import { faUserPlus, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Formulario = () => {
    const [value, setValue] = React.useState(50);

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const types = ["image/png", "image/jpeg", "image/jpg"];

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [cpf, setCpf] = useState("")
    const [status, setStatus] = useState("")
    const [city, setCity] = useState("")
    const [uf, setUf] = useState("")

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
                        <div>
                            {/* error message */}
                            {error && <p>{error}</p>}

                            {/* upload progress */}
                            {file && <p>{progress}% uploaded</p>}

                            {/* image url
                            {url && (
                                <p>
                                    <b>File url: </b>
                                    <a href={url}>{url}</a>
                                </p>
                            )} */}

                            {/* image display */}
                            {url && <img alt="" src={url}></img>}
                        </div>
                        <label className="mt-5 btn btn-primary">
                            <FontAwesomeIcon className="icons" icon={faCamera} />
                            Carregue sua foto
                            <input type="file" onChange={handleChange} />
                        </label>

                    </Form.Group>
                </div>
                <span className='line'></span>
                <div className="info-card">
                    <Form.Group controlId="formBasicName">
                        <Form.Row>
                            <Col>
                                <Form.Control placeholder="First name" />
                            </Col>
                            <Col>
                                <Form.Control placeholder="Last name" />
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    {/* <Form.Group as={Row}>
                        <Col xs="9">
                            <RangeSlider
                                value={value}
                                onChange={e => setValue(e.target.value)}
                            />
                        </Col>
                        <Col xs="3">
                            <Form.Control value={value} />
                        </Col>
                    </Form.Group> */}
{/* 
                    <Form.Group as={Row} controlId="formBasicIdade">
                        <Form.Label>Idade</Form.Label>

                        <Col xs="9">
                            <RangeSlider
                                value={value}
                                onChange={e => setValue(e.target.value)}
                            />
                        </Col>
                        <Col xs="3">
                            <Form.Control value={value} />
                        </Col>
                    </Form.Group> */}

                    <Form.Group controlId="formBasicCpf">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={cpf}
                            name="cpf"
                            onChange={e => setCpf(e.currentTarget.value)}
                            type="email"
                            placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicStatus">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="(99)9999-9999"
                            name="telefone"
                            onkeyup="mask(this, mtel)"
                            maxlength="15"
                            required
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
                    </Form.Group>
                    <Button
                        variant="success" type="submit">
                        <FontAwesomeIcon className="icons" icon={faUserPlus} />
                        salvar
                    </Button>
                </div>
            </ Form >
        </>
    )
}

export default Formulario