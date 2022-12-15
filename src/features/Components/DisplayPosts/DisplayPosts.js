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

    // const test = [
    //   'https://www.reddit.com/r/WhitePeopleTwitter/comments/zlnhkq/elon_musk_has_suspended_the_twitter_account_that/',  
    //   'https://www.reddit.com/r/AskReddit/comments/9wsvhk/what_is_the_best_post_of_reddit_of_all_time/', 
    //   'https://www.reddit.com/r/todayilearned/comments/zmgqby/til_that_in_2011_a_russian_wouldbe_suicide_bomber/the',
    //   'https://www.reddit.com/r/todayilearned/comments/zm04zt/til_pacman_grossed_1_billion_in_quarters_in_its/', 
    //   'https://zombo.com/'];

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