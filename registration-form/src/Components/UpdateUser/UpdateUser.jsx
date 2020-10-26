import React, { useEffect, useState } from 'react'
import { Container, InputGroup, Button, Form, Col, Row } from 'react-bootstrap/';
import RangeSlider from 'react-bootstrap-range-slider';
import MaskedFormControl from 'react-bootstrap-maskedinput'
import { useStorage } from '../../Hooks/useStorage'
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateItem = ({ props, setEditing, currentItem, updateItem }) => {

    const [users, setItem] = useState(currentItem);

    const [uf] = useState('AC');
    const [listUf, setListUf] = useState([]);
    const [listCity, setListCity] = useState([]);

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const { progress, url } = useStorage(file);
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
        setItem(currentItem);
        console.log("useEffect passes the currentItem: ", currentItem);
    }, [currentItem]);

    useEffect(() => {
        if (uf) {
            loadCity(uf);
        }
    }, [uf]);

    const onSubmit = e => {
        e.preventDefault();
        console.log("onSubmit passes the id and items", { users });
        updateItem({ currentItem }, users);
    };
    const onChange = e => {
        const { name, value } = e.target
        setItem({ ...users, [name]: value })
    }

    return (
        <>
       <div>
                <Form className="container" onSubmit={onSubmit} >
                    <div className="picture-card">
                        <Form.Group controlId="formBasicPicture">
                            <Form.Label></Form.Label>
                            <div>
                                {/* error message */}
                                {error && <p>{error}</p>}

                                {/* upload progress */}
                                {file && <p>{progress}% uploaded</p>}

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
                                        value={users.firstName}
                                        name="firstName"
                                        onChange={onChange}
                                        type="text"
                                        placeholder="Primeiro Nome" />
                                </Col>
                                <Col>
                                    <Form.Control
                                        value={users.lastName}
                                        name="lastName"
                                        onChange={onChange}
                                        type="text"
                                        placeholder="Sobrenome" />
                                </Col>
                            </Form.Row>
                        </Form.Group>

                        <Form.Group className='range' xs="10" as={Row}>
                            <Form.Label>Idade</Form.Label>
                            <Col className="slider">
                                <RangeSlider
                                    value={users.age}
                                    name="age"
                                    onChange={onChange}
                                />
                            </Col>
                            <Col className="age">
                                <Form.Control value={users.age} />
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formBasicCpf">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                value={users.email}
                                name="email"
                                onChange={onChange}
                                type="email"
                                placeholder="david@example.com" />
                        </Form.Group>

                        <Form.Group controlId="formBasicStatus">
                            <Form.Label>Telefone</Form.Label>
                            <MaskedFormControl
                                value={users.phone}
                                onChange={onChange}
                                type='text'
                                name='phoneNumber'
                                mask='(11) 1111-1111' />
                        </Form.Group>

                        <Form.Group controlId="formBasicState">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control as="select" value={users.uf} onChange={onChange}>
                                {listUf.map((a, b) => (
                                    <option value={a.id}>{a.sigla} - {a.nome}</option>
                                ))}
                            </Form.Control>
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control as="select" value={users.city} onChange={onChange}>
                                {listCity.map((a, b) => (
                                    <option value={a.sigla}>{a.nome}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicNews">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Checkbox value={users.sendNews}
                                        onChange={onChange} aria-label="Checkbox for following text input" /><p className='my-2 mx-1'>Desejo receber novidades por e-mail.</p>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Form.Group>
                        <Container>
                            <Row>
                                <Col>
                                    <Button
                                        variant="success" type="submit">
                                        Atualizar
            </Button>
                                </Col>
                                <Col>
                                    <Button
                                        variant="secondary" 
                                        onClick={() => setEditing(false)}>
                                        cancelar
            </Button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </ Form >
        </div>
        </>
    )
}
export default UpdateItem