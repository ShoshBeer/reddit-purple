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
        <Outlet />
      </Row>
    </Container>
  );
}

export default App;
