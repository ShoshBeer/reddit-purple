import React from "react";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { selectLinks } from "../InputField/InputFieldSlice";
import { useSelector } from "react-redux";

const initialState = { foundPosts: [],
    isFetchingPostData: false,
    failedFetchingPostData: false,
    JSONPosts: [],
    titles: [],
    subs: []   
}

const postDataSelector = (ind) => {
    return [ind].data.children[0].data;
}

//Grab data from urls linked in the input post url
export const fetchURLData = createAsyncThunk('postData/fetchURLData', async (arg, {getState, dispatch}) => {
    const state = getState();
    const JSONarray = state.postData.JSONPosts;
    let promises = [];
    try {
        promises = JSONarray.map( async (url) => {
            let promise = null;
                try {
                    promise = await fetch(url);
                    return promise;
                } catch(e) {console.log('whoopsie', e)}
        });
    } catch(e) {console.log('teehee!', e)};
    const getBack = await Promise.allSettled(promises);
    const getBackToo = await Promise.all(getBack.map((response) => {
            return response.value.json();
    }));
    try{ dispatch(loadTitles(getBackToo)); } catch(e) {console.log(e)};
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
            state.titles = action.payload.map((post, ind) => {
                try {
                return post[0].data.children[0].data.title;
                } catch { console.log('There is an error with the post at index: ', ind)
                // return null;
                }
            });
            },
        loadFoundPosts(state) {
        }
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

export const { loadTitles, loadJSON } = postDataSlice.actions;
export const loading = state => state.postData.isFetchingPostData;

export const selectTitles = (state) => {
    return state.postData.titles;
}
export const selectPosts = (state) => state.postJSON;
export default postDataSlice.reducer;
export const selectJSONLinks = state => state.JSONPosts;
export const selectFoundPosts = state => state.foundPosts;
