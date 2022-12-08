import React from "react";
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { selectLinks } from "../InputField/InputFieldSlice";
import { useSelector } from "react-redux";

const initialState = { foundPosts: [
    'https://www.reddit.com/r/AmItheAsshole/comments/zd31mr/aita_for_letting_my_sister_puke_on_my_brother_in/',
    'https://www.reddit.com/r/AmItheAsshole/comments/zd62bi/aita_for_making_my_daughter_return_a_halloween/',
    'https://www.reddit.com/r/AmItheAsshole/comments/zd5vpq/aita_for_telling_my_parents_i_wont_attend_their/',
    ],
    isFetchingPostData: false,
    failedFetchingPostData: false,
    postJSONList: [],
    titles: []    
}


//Grab data from urls linked in the input post url
export const fetchURLData = createAsyncThunk('postData/fetchURLData', async (arg, { getState }) => {
    const state = getState();
    const JSONarray = state.postData.postJSONList;
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
        if(response.value !== undefined) {
            return response.value.json();
        } else { return; }
    }));
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
                    state.postJSONList.push(JSONAdded);
                } else {
                    JSONAdded = link + '.json';
                    state.postJSONList.push(JSONAdded);
                };
            })
        },
        loadTitles(state) {
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
                    if(post) {
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
export const selectJSONLinks = state => state.postJSONList;
