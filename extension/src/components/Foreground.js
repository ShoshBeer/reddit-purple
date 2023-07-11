import React from 'react';
import { FullPost } from './FullPost';
import { Stack, Row, Container } from "react-bootstrap";

function Foreground({ title, postObjects }) {

  console.log('postObjects:\n', postObjects);
  return (
    <Container>
      <Row className='d-none' id="app-container">
        <h1 className='my-4 text-center'>{title}</h1>
        <Stack gap={3} className="mb-3">
          {postObjects.map((post, ind) => {
            return (
              <FullPost
                link={post.permalink}
                key={`${ind}+${post.link}`}
                title={post.title}
                author={post.author}
                body={post.selftext}
                sub={post.subreddit_name_prefixed}
                score={post.score}
                comments={post.comments}
                date={post.created_utc}
                secure_media_embed={post.secure_media_embed}
                url={post.url}
              />
            );
          })}
        </Stack>
      </Row>
    </Container>
  )
}

export default Foreground;
