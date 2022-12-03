import React from "react";
import * as example from './testJSON.json';


export function FindHyperlinksToReddit() {

    const filterHyperlinks = (postData) => {
        // Find hyperlinks to Reddit posts and comments
        // May need to add JSON.parse() here when actual data is used
        const comments = postData[1].data.children;
        let links = [];
        const regex = /\(http(s)?(.+)reddit\.com\/r\/([^\/]+)\/(?=(comments\/(.+)\)))/;
        // Enclosed in parentheses,
        // begins with http:// or https://,
        // may or may not contain www.,
        // may or may not contain a subdomain (np. en.),
        // may or may not end with a forward slash,
        // must contain each part of the URL (domain, /r/, subreddit, "comments", identifier, and the part after the identifier)

        for (let comment = 0; comment < comments.length; comment++) {
            if (comments[comment].kind !== "t1") {
                console.log('Not a comment at index ' + comment);
                console.log(comments[comment].kind);
            } else if (comments[comment].data.body.match(regex)) {
                const urlParts = comments[comment].data.body.match(regex);
                const url = `${urlParts[0]}${urlParts[4]}`.slice(1, -1);
                links.push(url);
            }
        }
        return links;

    }

    // console.log(filterHyperlinks(example));


    // (Maybe) limit by specified number
    // Eliminate duplicates
    // update state with array of links
    // export selector for array of links

    return (
        <div>
            {filterHyperlinks(example).map((link, index) => `\n${index} ${link}`)}
        </div>
    )
}