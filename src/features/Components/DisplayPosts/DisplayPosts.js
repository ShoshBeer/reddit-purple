import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FindLinksToReddit } from "../FindLinksToReddit/FindLinksToReddit";
import { Post } from "../Post/Post";
import { fetchURLData, loadJSON, loadTitles, selectTitles, selectJSONLinks } from "./postDataSlice"
import { selectLinks } from '../InputField/InputFieldSlice'

export function DisplayPosts() {
    const dispatch = useDispatch();
    const linkList = useSelector(selectLinks)
    let titles = useSelector(selectTitles);
    // const [links, setLinks] = useState([
    //     'https://www.reddit.com/r/AmItheAsshole/comments/zd31mr/aita_for_letting_my_sister_puke_on_my_brother_in/',
    //     'https://www.reddit.com/r/AmItheAsshole/comments/zd62bi/aita_for_making_my_daughter_return_a_halloween/',
    //     'https://www.reddit.com/r/AmItheAsshole/comments/zd5vpq/aita_for_telling_my_parents_i_wont_attend_their/',
    // ]);
    useEffect(() => {
        dispatch(loadJSON(linkList));
        dispatch(fetchURLData())
        dispatch(loadTitles())
    }, [linkList])

    return (
        <div className="post-container">
            <ul>
                { linkList.map((link, ind) => <Post post={link} key={ind} title={titles.ind} />)}
            </ul>
        </div>
    )
}