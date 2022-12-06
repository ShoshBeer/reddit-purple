import React from "react";
import { changeUserInput, 
         selectUserInput,
         selectIsValidLink,
         fetchPostData } from './InputFieldSlice';
import { useSelector, useDispatch } from "react-redux";


export function InputField() {

    const dispatch = useDispatch();

    const handleInput = e => {
        dispatch(changeUserInput(e.target.value));
    }

    const handleEnter = e => {
        if (e.key === 'Enter') {
            dispatch(fetchPostData());
        }
    }

    return (
        <div className="input-area">
            <h2 className="prompt">Find a post with Reddit links in the comments, and paste the URL below to browse the linked posts!</h2>
            <input 
                value={useSelector(selectUserInput)}
                placeholder="Paste a link to a Reddit post"
                onChange={(e) => handleInput(e)}
                onKeyUp={(e) => handleEnter(e)}
                style={useSelector(selectIsValidLink) ? 
                    {boxShadow: "0 0 20px #02b022"} : 
                    {boxShadow: "0 0 20px #ba1004"}} ></input>
        </div>
    )
}


