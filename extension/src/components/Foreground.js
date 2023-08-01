import React from 'react';
import { FullPost } from './FullPost';
import { Stack, Row, Container } from "react-bootstrap";
import { PostContainer } from './PostContainer.js';
import Loading from './Loading';

function Foreground({ title, postObjects, loading = false }) {

  return (
    <Container>
      <Row className='d-none' id="app-container">
        <h1 className='my-4 text-center'>{title}</h1>
        {loading ? <Loading /> : null}
        <PostContainer postObjects={postObjects} />
      </Row>
    </Container>
  )
}

export default Foreground;
