import React from "react";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { selectLinks } from "../InputField/InputFieldSlice";
import { useSelector } from "react-redux";
import example from "../FindLinksToReddit/testJSON.json";

const initialState = { foundPosts: [],
    isFetchingPostData: false,
    failedFetchingPostData: false,
    JSONPosts: [],
    titles: [],
    subs: [],
    upvotes: [],
    subs: [],
    comments: [],
}

//Grab data from urls linked in the input post url
export const fetchURLData = createAsyncThunk('postData/fetchURLData', async (arg, {getState, dispatch}) => {
    const state = getState();
    //remove .slice() method to get all
    const JSONarray = state.postData.JSONPosts.slice(0, 5);
    let promises = [];
    try {
        promises = JSONarray.map( async (url) => {
            let promise = null;
                try {
                    promise = await fetch(url);
                    return promise;
                } catch(e) {console.log('this error comes from mapping the JSON array to promises, inside the map function', e)}
        });
    } catch(e) {console.log('this error comes from mapping the JSON array to promises, outside the map function', e)};
    const getBack = await Promise.allSettled(promises);
    const getBackToo = await Promise.all(getBack.map((response) => {
            return response.value.json();
    }));
    const grabData = getBackToo.map((post) => {
        const { title, score, subreddit_name_prefixed } = post[0].data.children[0].data;
        const comments = post[1].data.children.map((comment) => {
            console.log(comment.data.body);
            return comment.data.body;
        });
        const smallData = {
            title,
            score,
            subreddit_name_prefixed,
            comments,
        };
        console.log('Here is the smallerized data', smallData);
        return smallData;
    })
    try{
        dispatch(loadTitles(grabData));
    } catch(e) {console.log(e)};
    return getBackToo;
})

const postDataSlice = createSlice({
    name: 'postData',
    initialState,
    reducers: {
        //takes a passed in list of links, then appends .json before the query to provide a list of URLs from which to fetch further data
        loadJSON(state, action) {
            const rawLinks = action.payload;
            rawLinks.forEach((link) => {
                const queryIndex = link.indexOf('?');
                let JSONAdded = '';
                if(queryIndex !== -1) {
                    JSONAdded = link.slice(0, queryIndex) + '.json' + link.slice(queryIndex);
                    state.JSONPosts.push(JSONAdded);
                } else {
                    JSONAdded = link + '.json';
                    state.JSONPosts.push(JSONAdded);
                };
            })
        },
        loadTitles(state, action) {
            //Load net upvotes
            console.log(action.payload);
            state.upvotes = action.payload.map((post, ind) => {
                    return post.score;
            });
            //Load Title
            state.titles = action.payload.map((post, ind) => {
                try {
                return post.title;
                } catch { console.log('There is an error grabing the title of the post at index: ', ind)
                // return null;
                };
            });
            
            //Load Subreddit
            state.subs = action.payload.map((post, ind) => {
                try {
                    return post.subreddit_name_prefixed;
                } catch(e) {
                    console.log(e, 'There is an error grabbing the subreddit for the post at index: ', ind)
                };
            });
            //load comments
            state.comments = action.payload.map((post, ind) => {
                try {
                    return post.comments;
                } catch(e) {
                    console.log(e, 'There is an error with the post at index: ', ind)
                };
            });

        },
        loadUpvotes(state, action) {
            state.upvotes = action.payload.map((post, ind) => {
                try {
                    return post.score;
                } catch(e) {
                    console.log(e, 'There is an error grabbing the net upvotes of the post at index: ', ind)
                };
            });
        },
        loadSub(state, action) {
            state.subs = action.payload.map((post, ind) => {
                try {
                    return post.subreddit_name_prefixed;
                } catch(e) {
                    console.log(e, 'There is an error grabbing the subreddit for the post at index: ', ind)
                };
            });
        },
        loadComments(state, action) {
            state.comments = action.payload.map((post, ind) => {
                try {
                    return post.comments;
                } catch(e) {
                    console.log(e, 'There is an error with the post at index: ', ind)
                };
            });
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchURLData.pending, (state, action) => {
                state.isFetchingPostData = true;
                state.failedFetchingPostData = false;
            })
            .addCase(fetchURLData.fulfilled, (state, action) => {
                state.foundPosts = [];
                action.payload.forEach(post => {
                    if(post && post.length === 2) {
                        state.foundPosts.push(post);
                    }
                })
                state.isFetchingPostData = false;
                state.failedFetchingPostData = false;
            })
            .addCase(fetchURLData.rejected, (state, action) => {
                state.isFetchingPostData = false;
                state.failedFetchingPostData = true;
            })
    }
})

export const { 
    loadTitles,
    loadJSON,
    loadComments,
    loadSub,
    loadUpvotes,
} = postDataSlice.actions;
export const loading = state => state.postData.isFetchingPostData;
export const selectTitles = (state) => {
    return state.postData.titles;
}
export default postDataSlice.reducer;
export const selectJSONLinks = state => state.postDataSlice.JSONPosts;
export const selectUpvotes = state => state.postData.upvotes;
export const selectSubs  = state => state.postData.subs;
export const selectComments  = state => state.postData.comments;
