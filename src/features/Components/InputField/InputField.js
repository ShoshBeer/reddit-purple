import React from "react";
import { changeUserInput, 
         selectUserInput,
         selectIsValidLink,
         fetchPostData } from './InputFieldSlice';
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";


export function InputField() {

    const dispatch = useDispatch();

    const handleInput = e => {
        dispatch(changeUserInput(e.target.value));
    }

    const handleEnter = e => {
        if (e.key === 'Enter') {
            dispatch(fetchPostData());
        }
    }

    return (
        <Container fluid>
            <Row className="align-items-center">
                <Col xs={4} >
                    <Card>
                        <Card.Img variant="top" src="" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    {/* card element here with pictures of UI */}
                </Col>
                <Col xs={8} className="input-area mt-5">
                    <Stack gap={5} >
                        <h2 className="prompt">Find a post with Reddit links in the comments, and paste the URL below to browse the linked posts!</h2>
                        <InputGroup hasValidation>
                            <Form.Control
                                value={useSelector(selectUserInput)}
                                placeholder="Paste a link to a Reddit post"
                                onChange={(e) => handleInput(e)}
                                onKeyUp={(e) => handleEnter(e)}
                                type="text"
                                isValid={useSelector(selectIsValidLink)}>
                            </Form.Control>
                            {/* <Form.Control.Feedback type="invalid">
                                Please enter a valid Reddit post link.
                            </Form.Control.Feedback> */}
                        </InputGroup>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}


