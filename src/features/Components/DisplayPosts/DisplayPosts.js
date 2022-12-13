import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../Post/Post";
import {
        fetchURLData, 
        loading, 
        loadJSON, 
        loadTitles, 
        selectComments,
        selectFoundPosts,
        selectSubs,
        selectTitles,
        selectUpvotes,
    } from "./postDataSlice"
import { selectLinks } from '../InputField/InputFieldSlice'
import { Stack } from "react-bootstrap";

export function DisplayPosts() {
    const dispatch = useDispatch();
    const linkList = useSelector(selectLinks);

    useEffect(() => {
        dispatch(loadJSON(linkList));
        dispatch(fetchURLData());
    }, [linkList]);

    const titles = useSelector(selectTitles);
    const subs = useSelector(selectSubs);
    const upvotes = useSelector(selectUpvotes);
    const comments = useSelector(selectComments);
    

    //remove this const, and change mapped array in <ul> to linkList get all
    const displayLinks = linkList.slice(0, 5);



    return (
        <Stack gap={3}>
                { displayLinks.map((link, ind) => {
                    return ( 
                        <Post 
                            post={link}
                            key={ind}
                            title={titles[ind]}
                            sub={subs[ind]}
                            score={upvotes[ind]}
                            comment={comments[ind]}
                        />
                    );
                })}
        </Stack>
    )
}