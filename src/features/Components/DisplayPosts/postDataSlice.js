import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = { 
    foundPosts: [],
    isFetchingPostData: false,
    failedFetchingPostData: false,
    JSONRedditLinks: [],
    titles: [],
    subs: [],
    upvotes: [],
    comments: [],
}

//Grab data from urls linked in the input post url
export const fetchURLData = createAsyncThunk('postData/fetchURLData', async (arg, {getState, dispatch}) => {
    const state = getState();
    //remove .slice() method to get all
    const JSONLinks = state.postData.JSONRedditLinks.slice(0, 5);
    const JSONDataPromises = JSONLinks.map( async (url) => {
        return await fetch(url);
    });
    const JSONSettledPromises = await Promise.allSettled(JSONDataPromises);
    const fulfilledPostData = await Promise.all(JSONSettledPromises.filter(response => response.status === 'fulfilled').map(response => response.value.json()));
    const grabData = fulfilledPostData.map((post) => {
        const { title, score, subreddit_name_prefixed } = post[0].data.children[0].data;
        const comments = post[1].data.children.map((comment) => {
            return comment.data.body;
        });
        const smallData = {
            title,
            score,
            subreddit_name_prefixed,
            comments,
        };
        return smallData;
    })
    try{
        dispatch(loadTitles(grabData));
    } catch(e) {console.log(e)};
    return fulfilledPostData;
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
                    state.JSONRedditLinks.push(JSONAdded);
                } else {
                    JSONAdded = link + '.json';
                    state.JSONRedditLinks.push(JSONAdded);
                };
            })
        },
        loadTitles(state, action) {
            //Load net upvotes
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
            .addCase(fetchURLData.pending, (state) => {
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
            .addCase(fetchURLData.rejected, (state) => {
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
export const selectJSONLinks = state => state.postDataSlice.JSONRedditLinks;
export const selectUpvotes = state => state.postData.upvotes;
export const selectSubs  = state => state.postData.subs;
export const selectComments  = state => state.postData.comments;
