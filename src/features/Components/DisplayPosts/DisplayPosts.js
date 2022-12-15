import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../Post/Post";
import {
        fetchURLData, 
        loadJSON,
        selectLoading, 
        selectPostObjects,
    } from "./postDataSlice"
import { selectLinks } from '../InputField/InputFieldSlice'

export function DisplayPosts() {
    const dispatch = useDispatch();
    const linkList = useSelector(selectLinks);
    const postObjects = useSelector(selectPostObjects);
    const loading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(loadJSON(linkList));
        dispatch(fetchURLData());
    }, [dispatch, linkList]);

    //remove this const, and change mapped array in <ul> to linkList get all
    const displayLinks = postObjects.slice(0, 5);

    return (
        <div className="post-container">
            <ul>
                { loading ? <p>Loading</p> : postObjects.length === 0 ? <div></div> : displayLinks.map((post, ind) => {
                    return ( 
                        <Post 
                            post={post.link} 
                            key={ind}
                            title={post.title}
                            sub={post.subreddit_name_prefixed}
                            score={post.score}
                            comment={post.comments}
                        />
                    );
                  })}
            </ul>
        </div>
    )
}