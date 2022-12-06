//TO BE DELETED (Not used)

import { createSlice } from "@reduxjs/toolkit";

const links = createSlice({
    name: 'links',
    initialState: {
        linkList: [],
        commentCounter: 0
    },
    reducers: {
        'addLinks': (state, action) => {
            // May need to add JSON.parse() here when actual data is used
            const comments = action.payload[1].data.children;
            const regexHyperlink = /\(http(s)?(.+)reddit\.com\/r\/([^\/]+)\/(comments\/(.+)\))/;
            // enclosed in parentheses
            const regexLink = /http(s)?(.+)reddit\.com\/r\/([^\/]+)\/(comments\/(.+))/;
            // begins with http:// or https://, may or may not contain www., may or may not contain a subdomain (np. en.), may or may not end with a forward slash, must contain each part of the URL (domain, /r/, subreddit, "comments", identifier, and the part after the identifier)

            for (let comment = 0; comment < comments.length; comment++) {
                if (comments[comment].kind !== "t1") {
                    //check if it's a comment
                } else if (comments[comment].data.body.match(regexHyperlink)) {
                    //check if there's a hyperlink !!what if there are multiple!!
                    const urlParts = comments[comment].data.body.match(regexHyperlink);
                    const url = urlParts[0].slice(1, -1);
                    if (!state.linkList.includes(url)) {
                        state.linkList.push(url);
                    }
                } else if (comments[comment].data.body.match(regexLink)) {
                    //check if there's a URL in the text !!what if there are multiple!!
                    const url = comments[comment].data.body.match(regexLink)[0];
                    if (!state.linkList.includes(url)) {
                        state.linkList.push(url);
                    }
                }
            }
            state.commentCounter = comments.length;
        }
    }
}
)

export const addLinks = links.actions.addLinks;
export const selectLinks = state => state.links.linkList;
export const linksReducer = links.reducer;

