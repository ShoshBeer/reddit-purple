import React from 'react';
import './App.css';
import { DisplayPosts } from './features/Components/DisplayPosts/DisplayPosts';
import { InputField } from './features/Components/InputField/InputField';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Sidebar } from './features/Components/Sidebar/Sidebar';
import help from './resources/help.png';
import search from './resources/search.jpg';

function App() {
  return (
    <div className='main-wrapper main-wrapper-responsive-lg flex-container'>
      <Sidebar 
        className='flex-child'
        shortcuts={[{title: 'help', src: help, alt: 'Click here to go back to the search page.', post: null}, {title: 'search', src: search, alt: 'Click here to search for a new post.', post: null}]}/>
      <Sidebar 
        className='flex-child'
        shortcuts={[{title: 'title', src: 'https://i.redd.it/h6grhudubv4a1.jpg', alt: 'birbs', post: {comments: {top: "whos commenting in 2019?"}, postNum: 1}}, {title: 'othertitle', src: "https://static.thenounproject.com/png/180007-200.png", alt: "sub", post: {}}]}/> 
      <Container 
        fluid 
        className="flex-child main App border">
        <Row>
          <Col>
            <h1>Welcome to the Museum of Reddit Natural History!</h1>
            <p>Use this site to browse Reddit posts linked in the comments of another post!</p>
            <p>Pop this link below to see what happens: https://www.reddit.com/r/AskReddit/comments/9wsvhk/what_is_the_best_post_of_reddit_of_all_time/</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField mt="10"/>
            <DisplayPosts />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;


{/* <Container fluid className="App border">
<Row>
  <Col>
    <h1>Welcome to the Museum of Reddit Natural History!</h1>
    <p>Use this site to browse Reddit posts linked in the comments of another post!</p>
    <p>Pop this link below to see what happens: https://www.reddit.com/r/AskReddit/comments/9wsvhk/what_is_the_best_post_of_reddit_of_all_time/</p>
  </Col>
</Row>
<Row>
  <Col xs="1"  className='border'>
   <Sidebar shortcuts={[{title: 'help', src: help, alt: 'Click here to go back to the search page.', post: null}, {title: 'search', src: search, alt: 'Click here to search for a new post.', post: null}]}/> 
  </Col>
  <Col xs="1">
   <Sidebar shortcuts={[{title: 'title', src: 'https://i.redd.it/h6grhudubv4a1.jpg', alt: 'birbs', post: {comments: {top: "whos commenting in 2019?"}, postNum: 1}}, {title: 'othertitle', src: "https://static.thenounproject.com/png/180007-200.png", alt: "sub", post: {}}]}/> 
  </Col>
  <Col>
    <InputField mt="10"/>
    <DisplayPosts />
  </Col>
</Row>
</Container> */}