import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import {
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <Container className="App">
      <Row>
        <Col>
          <h1>Welcome to the Museum of Reddit Natural History!</h1>
          <p>Use this site to browse Reddit posts linked in the comments of another post!</p>
          <p>Pop this link below to see what happens:</p>
          <p>https://www.reddit.com/r/AskReddit/comments/9wsvhk/what_is_the_best_post_of_reddit_of_all_time/</p>
        </Col>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
}

export default App;
