import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadTitles, selectComments, selectSubs, selectTitles, selectUpvotes } from "../DisplayPosts/postDataSlice";

export const Post = ( { post, title, sub, comment, score } ) => {
    
    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Text>{sub}</Card.Text>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>Upvotes: {score}</Card.Text>
                            <Button href={post}>View Post in Reddit</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}