import React from "react";
import * as example from './testJSON.json';


export function FindHyperlinksToReddit() {

    const filterHyperlinks = (postData) => {
        // Find hyperlinks to Reddit posts and comments
        // May need to add JSON.parse() here when actual data is used
        const comments = postData[1].data.children;
        let links = [];
        let commentCounter = 0; //for debugging but also useful?
        let commentArray = []; //for debugging
        const regexHyperlink = /\(http(s)?(.+)reddit\.com\/r\/([^\/]+)\/(?=(comments\/(.+)\)))/;
        // enclosed in parentheses
        const regexLink = /http(s)?(.+)reddit\.com\/r\/([^\/]+)\/(?=(comments\/(.+)))/;
        // begins with http:// or https://
        // may or may not contain www.
        // may or may not contain a subdomain (np. en.)
        // may or may not end with a forward slash
        // must contain each part of the URL (domain, /r/, subreddit, "comments", identifier, and the part after the identifier)

        for (let comment = 0; comment < comments.length; comment++) {
            commentCounter += 1;
            commentArray.push(comments[comment].data.body); //for debugging
            if (comments[comment].kind !== "t1") {
                //check if it's a comment
                console.log('Not a comment at index ' + comment);
                console.log(comments[comment].kind);
            } else if (comments[comment].data.body.match(regexHyperlink)) {
                //check if there's a hyperlink !!what if there are multiple!!
                const urlParts = comments[comment].data.body.match(regexHyperlink);
                const url = `${urlParts[0]}${urlParts[4]}`.slice(1, -1);
                links.push(url);
            } else if (comments[comment].data.body.match(regexLink)) {
                //check if there's a URL in the text !!what if there are multiple!!
                const urlParts = comments[comment].data.body.match(regexLink);
                const url = `${urlParts[0]}${urlParts[4]}`
                links.push(url);
            }
        }
        console.log(`${commentCounter} comments searched. ${links.length} links found.`);
        return links;

    }

    console.log(filterHyperlinks(example));


    // (Maybe) limit by specified number
    // Eliminate duplicates
    // update state with array of links
    // export selector for array of links

    return (
        <div>
        </div>
    )
}