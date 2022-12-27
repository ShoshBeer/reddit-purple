import React, { useState } from "react";
import {
    changeUserInput,
    selectUserInput,
    selectIsValidLink,
    fetchPostData
} from './InputFieldSlice';
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Reddit_img from "../../../resources/Reddit_old_way.png";
import placeholder from "../../../resources/Placeholder.png";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export function InputField() {

    const radios = [
        { name: 'Before', value: '1', text: 'So much effort to find the links!', img: Reddit_img },
        { name: 'After', value: '2', text: 'Easy to browse :)', img: placeholder }
    ];
    const [radioValue, setRadioValue] = useState(radios[0]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInput = e => {
        dispatch(changeUserInput(e.target.value));
    }
    const handleEnter = e => {
        // if (e.key === 'Enter') {
            dispatch(fetchPostData());
            navigate('/display');
        // }
    }

    return (
        <Container fluid>
            <Row className="align-items-center py-4">
                <Col xs={4}>
                    <Card>
                        <Card.Body >
                            <Card.Title>
                                <ButtonGroup>
                                    {radios.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            name="radio"
                                            style={radioValue.value === radio.value ? { backgroundColor: '#FF5700', borderColor: '#FF5700' } : { backgroundColor: '#fff', color: '#FF5700', borderColor: '#FF5700' }}
                                            value={radio.value}
                                            checked={radioValue.value === radio.value}
                                            onChange={(e) => setRadioValue(radios[e.currentTarget.value - 1])}
                                        >{radio.name}</ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Card.Title>
                            <Card.Text>
                                {radioValue.text}
                            </Card.Text>
                            <Card.Img src={radioValue.img} />
                        </Card.Body>

                    </Card>
                </Col>
                <Col xs={8}>
                    <Stack gap={5} >
                        <h2>Find a post with Reddit links in the comments, and paste the URL below to browse the linked posts!</h2>

                        <Stack gap={3}>
                          <form>
                            <InputGroup hasValidation>
                                <Form.Control
                                    value={useSelector(selectUserInput)}
                                    placeholder="Paste a link to a Reddit post"
                                    onChange={(e) => handleInput(e)}
                                    // onKeyUp={(e) => handleEnter(e)}
                                    type="text"
                                    isValid={useSelector(selectIsValidLink)}
                                    />
                                <Button as="input" type="submit" value="Submit" onClick={(e) => handleEnter(e)} />
                                {/* <Form.Control.Feedback type="invalid">
                                        Please enter a valid Reddit post link.
                                    </Form.Control.Feedback> */}
                            </InputGroup>
                          </form>
                        </Stack>

                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}


