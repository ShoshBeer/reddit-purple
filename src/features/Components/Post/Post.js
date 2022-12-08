import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTitles, selectTitles } from "../DisplayPosts/postDataSlice";

export const Post = ( {post, title} ) => {

    return (
        <div>
            <a href={post}>{title}</a>
        </div>
    )
}