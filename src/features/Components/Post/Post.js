import React from "react";

export const Post = ( {post, title} ) => {
    return (
        <div>
            <a href={post}>Link to Post: {title}</a>
        </div>
    )
}