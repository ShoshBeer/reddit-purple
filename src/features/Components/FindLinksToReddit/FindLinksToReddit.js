import React from "react";
import * as example from './testJSON.json';
import { addLinks } from "./FindLinksToRedditSlice";
import { useDispatch } from "react-redux";
//Shouldn't be a component? This file may be deleted once the parts are integrated

export function FindLinksToReddit() {

    // (Maybe) limit by specified number

    const dispatch = useDispatch();
    dispatch(addLinks(example));
}
