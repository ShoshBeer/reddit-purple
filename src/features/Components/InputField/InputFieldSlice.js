import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPostData = createAsyncThunk(
    'input/fetchPostData',
    async (arg, { getState }) => {
        const state = getState();
        const response = await fetch(state.input.postLink);
        const jsonResponse = await response.json();
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
        postData: []
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

export const changeUserInput = input.actions.changeUserInput;
export const selectUserInput = state => state.input.userInput;
export const selectPostData = state => state.input.postData;
export const selectPostLink = state => state.input.postLink;
export const selectIsValidLink = state => state.input.isValidLink;
export const inputReducer = input.reducer;
