import React from "react";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initalState = { foundPosts: [
    'https://www.reddit.com/r/AmItheAsshole/comments/zd31mr/aita_for_letting_my_sister_puke_on_my_brother_in/',
    'https://www.reddit.com/r/AmItheAsshole/comments/zd62bi/aita_for_making_my_daughter_return_a_halloween/',
    'https://www.reddit.com/r/AmItheAsshole/comments/zd5vpq/aita_for_telling_my_parents_i_wont_attend_their/',
]}

//Grab data from urls linked in the input post url
export const fetchURLData = createAsyncThunk('postData/fetchURLData', async (state) => {
        const promiseArr = state.postJSON.forEach((post) => fetch(post));
        const response = await Promise.all(promiseArr);
        const JSONresponse = await response.json();
        return JSONresponse
})

const postDataSlice = createSlice({
    name: 'postData',
    initialState,
    reducers: {
        loadJSON(state) {
            state.postJSON = state.foundPosts.map(post => post + '.json');
        },
        loadTitles(state) {
            state.titles = state.foundPosts.map(post => post.data.children[0].data.title)
        }
    },
    extraReducers: builder => {
        builder
            .addCase()
    }
})

export default postDataSlice.reducer;