import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTitles, selectComments, selectSubs, selectTitles, selectUpvotes } from "../DisplayPosts/postDataSlice";

export const Post = ( { post, title, sub, comment, score } ) => {
    
    return (
        <div>
            <h1>{sub}</h1>
            <h2>{title}</h2>
            <p>Upvotes: {score}</p>
            <a href={post}>Link to post</a>
            <hr />
        </div>
    )
}