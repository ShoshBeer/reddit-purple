import React from "react";
import home from '../../src/resources/home.png';
import { FullPost } from "./FullPost";
import { Stack } from "react-bootstrap";

export function DisplayPosts(postTitle, postObjects, linkListLength) {

    return (
        <div className="mt-4">
          <img className="home-icon mr-2" onClick={() => navigate('/')} style={{float: 'left'}} alt='Home icon' height='50px' src={home}/>
          {postTitle.length !== 0 &&
            <>
            <h2><a target="_blank" rel="noreferrer" href={postTitle.href} className="text-decoration-none">{postTitle.innerHTML}</a></h2>
            <p style={{marginTop: '10px'}}>Found {linkListLength} Reddit posts linked in the comments!</p>
            </>
          }
          <Stack gap={3} className="mb-3">
            { loading ? <p>Loading</p> : postObjects.length === 0 ? <div></div> : postObjects.map((post, ind) => {
                return ( 
                    <FullPost 
                        link={post.link} 
                        key={`${ind}+${post.link}`}
                        title={post.title}
                        author={post.author}
                        body={post.selftext}
                        sub={post.subreddit_name_prefixed}
                        score={post.score}
                        comments={post.comments}
                        date={post.created_utc}
                        media_embed={post.media_embed}
                        secure_media={post.secure_media}
                        secure_media_embed={post.secure_media_embed}
                        media={post.media}
                        url={post.url}
                    />
                );
            })}
          </Stack>
        </div>
    )
}
