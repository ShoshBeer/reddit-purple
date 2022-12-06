import React from "react";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import example from "../FindLinksToReddit/testJSON.json";

const initialState = { foundPosts: [
    'https://www.reddit.com/r/AmItheAsshole/comments/zd31mr/aita_for_letting_my_sister_puke_on_my_brother_in/',
    'https://www.reddit.com/r/AmItheAsshole/comments/zd62bi/aita_for_making_my_daughter_return_a_halloween/',
    'https://www.reddit.com/r/AmItheAsshole/comments/zd5vpq/aita_for_telling_my_parents_i_wont_attend_their/',
    ],
    isFetchingPostData: false,
    failedFetchingPostData: false,
    postJSON: [],
    titles: []    
}

//Grab data from urls linked in the input post url
export const fetchURLData = createAsyncThunk('postData/fetchURLData', async (arr, { getState}) => {
        const state = getState();
        const promiseArr = state.postData.postJSON.forEach((post) => fetch(post));
        console.log('this is the promis array', promiseArr)
        const response = await Promise.all(promiseArr);
        const JSONresponse = await response.json();
        return JSONresponse
})

const fetchedData = fetchURLData();
console.log('I got this: ', fetchedData);

const postDataSlice = createSlice({
    name: 'postData',
    initialState,
    reducers: {
        loadJSON(state) {
            state.postJSON = state.foundPosts.map(post => post + '.json');
        },
        loadTitles(state) {
            // console.log('example: ' , example)
            state.titles = example[0].data.children[0].data.title;
            console.log('the titles in postDataSlice', state.titles)
            //     state.postJSON.map( (post) => { 
            //     console.log('post: ', post)
            //     console.log('this is post.data: ', post.data);
            //     return post.data.children[0].data.title
            // })
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchURLData.pending, (state, action) => {
                state.isFetchingPostData = true;
                state.failedFetchingPostData = false;
            })
            .addCase(fetchURLData.fulfilled, (state, action) => {
                state.fetchedPostData = action.payload
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
    console.log('I AM THE STATE: ', state);
    return state.postData.titles;
}
export const selectPosts = (state) => state.postJSON;
export default postDataSlice.reducer;