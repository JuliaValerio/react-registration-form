import React, { useState, useEffect } from "react"
import * as firebase from "firebase/app";
import { useStorage } from '../../Hooks/useStorage'
import "./Form.css";
import { InputGroup, Button, Form, Col, Row } from 'react-bootstrap/';
import RangeSlider from 'react-bootstrap-range-slider';
import MaskedFormControl from 'react-bootstrap-maskedinput'
import { faUserPlus, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Formulario = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const types = ["image/png", "image/jpeg", "image/jpg"];

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [sendNews, setSendNews] = useState("")
    const { progress, url } = useStorage(file);

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
    //functions for fields address
    const [uf, setUf] = useState('AC');
    const [listUf, setListUf] = useState([]);
    const [city, setCity] = useState('');
    const [listCity, setListCity] = useState([]);
    function loadUf() {
        let url = 'https://servicodados.ibge.gov.br/';
        url = url + 'api/v1/localidades/estados';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.nome.localeCompare(b.nome));
                setListUf([...data]);
            });
    }
    function loadCity(id) {
        let url = 'https://servicodados.ibge.gov.br/api/v1/';
        url = url + `localidades/estados/${id}/municipios`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.nome.localeCompare(b.nome));
                setListCity([...data]);
            });
    }
    useEffect(() => {
        loadUf();
    }, []);
    useEffect(() => {
        if (uf) {
            loadCity(uf);
        }
    }, [uf]);

    //Submit form
    const onSubmit = e => {
        console.log("funciona")
        e.preventDefault()
        firebase
            .firestore()
            .collection("users")
            .add({
                firstName,
                lastName,
                age,
                email,
                phone,
                city,
                uf,
                sendNews,
                url
            })
            .then(() => setFile(url), setFirstName(""), setLastName(""), setEmail(""), setPhone(""), setAge(""), setCity(""), setUf(""), setSendNews(""))
    }




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
                            <Form.Label>Nome</Form.Label>
                            <Col>
                                <Form.Control
                                    onChange={e => setFirstName(e.currentTarget.value)}
                                    className='name'
                                    placeholder="Primeiro Nome" />
                            </Col>
                            <Col>
                                <Form.Control
                                    onChange={e => setLastName(e.currentTarget.value)}
                                    placeholder="Sobrenome" />
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <Form.Group className='range' xs="10" as={Row}>
                        <Form.Label>Idade</Form.Label>
                        <Col className="slider">
                            <RangeSlider
                                onChange={e => setAge(e.target.value)}
                            />
                        </Col>
                        <Col className="age">
                            <Form.Control value={age} />
                        </Col>
                    </Form.Group>

                    <Form.Group controlId="formBasicCpf">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={email}
                            name="cpf"
                            onChange={e => setEmail(e.currentTarget.value)}
                            type="email"
                            placeholder="david@example.com" />
                    </Form.Group>

                    <Form.Group controlId="formBasicStatus">
                        <Form.Label>Telefone</Form.Label>
                        <MaskedFormControl
                            onChange={e => setPhone(e.currentTarget.value)}
                            type='text'
                            name='phoneNumber'
                            mask='(11) 1111-1111' />
                    </Form.Group>

                    <Form.Group controlId="formBasicState">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control as="select" value={uf} onChange={e => setUf(e.target.value)}>
                            {listUf.map((a, b) => (
                                <option value={a.id}>{a.sigla} - {a.nome}</option>
                            ))}
                        </Form.Control>
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control as="select" value={city} onChange={e => setCity(e.target.value)}>
                            {listCity.map((a, b) => (
                                <option value={a.sigla}>{a.nome}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicNews">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox onChange={e => setSendNews(e.currentTarget.value)} aria-label="Checkbox for following text input" /><p className='my-2 mx-1'>Desejo receber novidades por e-mail.</p>
                            </InputGroup.Prepend>
                        </InputGroup>
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