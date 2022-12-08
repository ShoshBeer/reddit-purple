import React from "react";
<<<<<<< HEAD
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import example from "../FindLinksToReddit/testJSON.json";
import { selectLinks } from "../InputField/InputFieldSlice";
import { useSelector } from "react-redux";
=======
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import example from "../FindLinksToReddit/testJSON.json";
>>>>>>> 3aaca58b5345cc8740d184fa46f107c50b0b2786

const initialState = { foundPosts: [
    'https://www.reddit.com/r/AmItheAsshole/comments/zd31mr/aita_for_letting_my_sister_puke_on_my_brother_in/',
    'https://www.reddit.com/r/AmItheAsshole/comments/zd62bi/aita_for_making_my_daughter_return_a_halloween/',
    'https://www.reddit.com/r/AmItheAsshole/comments/zd5vpq/aita_for_telling_my_parents_i_wont_attend_their/',
    ],
    isFetchingPostData: false,
    failedFetchingPostData: false,
<<<<<<< HEAD
    postJSONList: [],
    titles: []    
}

// const failureCallback = () => {
//     console.log('Something has failed');
// }

// async function multiFetch(array) {
//     let returnArr = []
//     await array.forEach(item => fetch(item).catch(item => console.log(item, ' Failed')))
//     .then((result) => {
//         console.log(result); 
//         returnArr.push(result);
//     })
// }

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

=======
    postJSON: [],
    titles: []    
}

>>>>>>> 3aaca58b5345cc8740d184fa46f107c50b0b2786
//Grab data from urls linked in the input post url
export const fetchURLData = createAsyncThunk('postData/fetchURLData', async (arr, { getState}) => {
        const state = getState();
        const promiseArr = state.postData.postJSON.forEach((post) => fetch(post));
        console.log('this is the promis array', promiseArr)
        const response = await Promise.all(promiseArr);
        const JSONresponse = await response.json();
        return JSONresponse
})

<<<<<<< HEAD
const fetchedData = fetchURLData();
console.log('I got this: ', fetchedData);
=======
>>>>>>> 3aaca58b5345cc8740d184fa46f107c50b0b2786

const postDataSlice = createSlice({
    name: 'postData',
    initialState,
    reducers: {
<<<<<<< HEAD
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
            state.titles.push(example[0].data.children[0].data.title);
            // console.log('the titles in postDataSlice', state.titles)
=======
        loadJSON(state) {
            state.postURLJSON = state.foundPosts.map(post => post + '.json');
        },
        loadTitles(state) {
            // console.log('example: ' , example)
            state.titles = example[0].data.children[0].data.title;
            console.log('the titles in postDataSlice', state.titles)
>>>>>>> 3aaca58b5345cc8740d184fa46f107c50b0b2786
            //     state.postJSON.map( (post) => { 
            //     console.log('post: ', post)
            //     console.log('this is post.data: ', post.data);
            //     return post.data.children[0].data.title
            // })
<<<<<<< HEAD
        },
        loadFoundPosts(state) {
            // const queryIndex = url.indexOf('?');
            // state.postLink = url.slice(0, queryIndex) + '.json' + url.slice(queryIndex);
            // state.foundPosts = state.input.linkList
=======
>>>>>>> 3aaca58b5345cc8740d184fa46f107c50b0b2786
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchURLData.pending, (state, action) => {
                state.isFetchingPostData = true;
                state.failedFetchingPostData = false;
            })
            .addCase(fetchURLData.fulfilled, (state, action) => {
<<<<<<< HEAD
                state.foundPosts = [];
                action.payload.forEach(post => {
                    if(post) {
                        state.foundPosts.push(post);
                    }
                })
=======
                state.fetchedPostData = action.payload
>>>>>>> 3aaca58b5345cc8740d184fa46f107c50b0b2786
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
<<<<<<< HEAD

=======
>>>>>>> 3aaca58b5345cc8740d184fa46f107c50b0b2786
export const selectTitles = (state) => {
    return state.postData.titles;
}
export const selectPosts = (state) => state.postJSON;
export default postDataSlice.reducer;
<<<<<<< HEAD
export const selectJSONLinks = state => state.postJSONList;
=======
>>>>>>> 3aaca58b5345cc8740d184fa46f107c50b0b2786
