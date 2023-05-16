import React, { useEffect } from "react";
import home from '../../../resources/home.png'
import { useDispatch, useSelector } from "react-redux";
import { FullPost } from "../FullPost/FullPost";
import {
        fetchURLData, 
        loadJSON,
        selectLoading, 
        selectPostObjects,
    } from "./postDataSlice"
import { 
        selectLinks, 
        selectPostData, 
        selectIsValidLink,
        selectCommentCounter,
    } from '../InputField/InputFieldSlice'
import { Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function DisplayPosts() {
    const dispatch = useDispatch();
    const linkList = useSelector(selectLinks);
    const postTitle = useSelector(selectPostData);
    const totalComments = useSelector(selectCommentCounter);
    const postObjects = useSelector(selectPostObjects);
    const loading = useSelector(selectLoading);
    const navigate = useNavigate();
    const isValid = useSelector(selectIsValidLink);

    const baseLink = 'https://www.reddit.com';

    //Change this to key off of "IsValidLink" insead.
    useEffect(() => {
        if(isValid === false) {
            navigate("/");
        } 
    }, [navigate, isValid]);

    useEffect(() => {
        dispatch(loadJSON(linkList));
        dispatch(fetchURLData());
    }, [dispatch, linkList]);

    return (
        <div className="mt-4">
          <img className="home-icon mr-2" onClick={() => navigate('/')} style={{float: 'left'}} alt='Home icon' height='50px' src={home}/>
          {postTitle.length !== 0 &&
            <>
            <h2><a target="_blank" href={baseLink + postTitle[0].data.children[0].data.permalink} className="text-decoration-none">{postTitle[0].data.children[0].data.title}</a></h2>
            <p style={{marginTop: '10px'}}>Searched {totalComments} comments and found {linkList.length} posts!</p>
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
