import React from 'react';
import { FullPost } from './FullPost';
import { Stack, Row, Container } from "react-bootstrap";
import { PostContainer } from './PostContainer.js';

function Foreground({ title, postObjects }) {

  console.log('postObjects:\n', postObjects);
  return (
    <Container>
      <Row className='d-none' id="app-container">
        <h1 className='my-4 text-center'>{title}</h1>
        <PostContainer />
      </Row>
    </Container>
  )
}

export default Foreground;
