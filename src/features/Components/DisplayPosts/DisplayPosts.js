import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../Post/Post";
import { fetchURLData, loading, loadJSON, loadTitles, selectFoundPosts, selectTitles, } from "./postDataSlice"
import { selectLinks } from '../InputField/InputFieldSlice'

export function DisplayPosts() {
    const dispatch = useDispatch();
    const linkList = useSelector(selectLinks)
    const titles = useSelector(selectTitles);
    const foundPosts = useSelector(selectFoundPosts);
    const isLoading = useSelector(loading);

    useEffect(() => {
        dispatch(loadJSON(linkList));
        dispatch(fetchURLData());
    }, [linkList]);

    return (
        <div className="post-container">
            <ul>
                { linkList.map((link, ind) => <Post post={link} key={ind} title={titles[ind]} />)}
            </ul>
        </div>
    )
}