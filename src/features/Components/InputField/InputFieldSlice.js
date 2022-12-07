import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPostData = createAsyncThunk(
    'input/fetchPostData',
    async (arg, { getState, dispatch }) => {
        const state = getState();
        const response = await fetch(state.input.postLink);
        const jsonResponse = await response.json();
        dispatch(addLinks(jsonResponse));
        return jsonResponse;
    }
)

const input = createSlice({
    name: 'input',
    initialState: {
        userInput: '',
        isValidLink: false,
        postLink: '',
        isLoading: false,
        failedToLoad: false,
        postData: [],
        linkList: [],
        commentCounter: 0
    },
    reducers: {
        'changeUserInput': (state, action) => {
            state.userInput = action.payload;
            const regexLink = /http(s)?(.+)reddit\.com\/r\/([^\/]+)\/(comments\/(.+))/;
            if (action.payload.match(regexLink)) {
                state.isValidLink = true;
                const url = action.payload.match(regexLink)[0];
                if (url.indexOf('?') !== -1) {
                    const queryIndex = url.indexOf('?');
                    state.postLink = url.slice(0, queryIndex) + '.json' + url.slice(queryIndex);
                } else {
                    state.postLink = url + '.json';
                }
            } else {
                state.isValidLink = false;
            }
        },

        'addLinks': (state, action) => {
            const comments = action.payload[1].data.children;
            const regexLink = /(?!.+\\)http(s)?(:\/\/)?(www\.)?([^.]+\.)?reddit\.com\/r\/([^/]+)\/(comments\/([^) ]+))/g;
            // begins with http:// or https://, may or may not contain www., may or may not contain a subdomain (np. en.)*, may or may not end with a forward slash, must contain each part of the URL (domain, /r/, subreddit, "comments", identifier, and the part after the identifier)
            //can I detect and convert amp links to reddit links?
            for (let comment = 0; comment < comments.length; comment++) {
                if (comments[comment].kind !== "t1") {
                    //check if it's a comment
                } else if (comments[comment].data.body.match(regexLink)) {
                    //check if there's a link
                    const urlArray = comments[comment].data.body.match(regexLink);
                    //url is an array with all matching elements (i.e. each element is a reddit link)
                    for (let url=0; url < urlArray.length; url++) {
                        if (!state.linkList.includes(urlArray[url])) {
                            state.linkList.push(urlArray[url]);
                        }
                    }
                }
            }
            state.commentCounter = comments.length;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostData.pending, (state, action) => {
                state.isLoading = true;
                state.failedToLoad = false;
            })
            .addCase(fetchPostData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.failedToLoad = false;
                state.postData = action.payload;
            })
            .addCase(fetchPostData.rejected, (state, action) => {
                state.isLoading = false;
                state.failedToLoad = true;
            })
    }
})


export const selectUserInput = state => state.input.userInput;
export const selectIsValidLink = state => state.input.isValidLink;
export const selectPostLink = state => state.input.postLink;
export const selectPostData = state => state.input.postData;
export const selectLinks = state => state.input.linkList;
export const changeUserInput = input.actions.changeUserInput;
export const addLinks = input.actions.addLinks;
export const inputReducer = input.reducer;

