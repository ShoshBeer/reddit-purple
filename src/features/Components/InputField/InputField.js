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
    const valid = useSelector(selectIsValidLink);

    const handleInput = e => {
        dispatch(changeUserInput(e.target.value));
    }
    const handleEnter = () => {
        dispatch(fetchPostData());
        navigate('/display');
    }

    const handleExample = () => {
      dispatch(changeUserInput("https://www.reddit.com/r/AskReddit/comments/9wsvhk/what_is_the_best_post_of_reddit_of_all_time/"));
    }

    return (
        <Container fluid>
            <Row>
              <Col>
                <h1>Welcome to the Museum of Reddit Natural History!</h1>
                <p>Use this site to browse Reddit posts linked in the comments of another post!</p>
              </Col>
            </Row>
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
                    <Stack gap={5}>
                        <h2>Find a post with Reddit links in the comments, and paste the URL below to browse the linked posts!</h2>
                        <Button variant='outline-secondary' onClick={handleExample}>Click here for an example!</Button>
                        <Stack gap={3}>
                          <Form>
                            <InputGroup>
                                <Form.Control
                                    value={useSelector(selectUserInput)}
                                    placeholder="Paste a link to a Reddit post"
                                    onChange={(e) => handleInput(e)}
                                    type="text"
                                    style={
                                        {borderRadius: "0.375rem 0 0 0.375rem"}
                                    }
                                />
                                    <Button
                                      as="input"
                                      type="submit"
                                      value="Submit"
                                      id="button-addon1"
                                      disabled={!valid}
                                      onClick={handleEnter}
                                    />
                            </InputGroup>
                          </Form>
                        </Stack>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}


