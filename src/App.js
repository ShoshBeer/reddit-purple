import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
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
