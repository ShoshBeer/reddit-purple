import React, { useState } from "react";
import { FindHyperlinksToReddit } from "../FindHyperlinksToReddit/FindHyperlinksToReddit";
import { Post } from "../Post/Post";

export function DisplayPosts() {

    const [links, setLinks] = useState([
        'https://www.reddit.com/r/AmItheAsshole/comments/zd31mr/aita_for_letting_my_sister_puke_on_my_brother_in/',
        'https://www.reddit.com/r/AmItheAsshole/comments/zd62bi/aita_for_making_my_daughter_return_a_halloween/',
        'https://www.reddit.com/r/AmItheAsshole/comments/zd5vpq/aita_for_telling_my_parents_i_wont_attend_their/',
    ]);

    return (
        <div className="post-container">
            <ul>
                { links.map((link, ind) => <Post post={link} key={ind} />)}
            </ul>
        </div>
    )
}