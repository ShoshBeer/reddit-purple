import React from "react";
import * as example from './testJSON.json';
import { addLinks } from "./FindLinksToRedditSlice";
import { useDispatch } from "react-redux";


export function FindLinksToReddit() {

    // (Maybe) limit by specified number

    const dispatch = useDispatch();
    dispatch(addLinks(example));

    return (
        <div>
        </div>
    )
}
