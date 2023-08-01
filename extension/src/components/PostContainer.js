import React from "react";
import { Stack } from "react-bootstrap";
import { FullPost } from "./FullPost";

export function PostContainer( {postObjects}) {
  return(
    <Stack gap={3} id='PostContainer' className="mb-3">
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
  )
}
