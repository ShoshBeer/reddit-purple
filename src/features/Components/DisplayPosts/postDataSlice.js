import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = { 
    isFetchingPostData: false,
    failedFetchingPostData: false,
    JSONRedditLinks: [],
    postObjects: []
}

//Grab data from urls linked in the input post url
export const fetchURLData = createAsyncThunk(
  'postData/fetchURLData', 
  async (arg, {getState}) => {
    const state = getState();
    let fulfilledLinks = [];
    //this takes the link from the inputfield slice and gives it to the post component as a prop to make the link back to the original post
    //instead it will be better to get the url from post[0].data.children[0].data.url, but need to figure out how it works between a linked post and a linked comment

    //remove .slice() method to get all
    const JSONLinks = state.postData.JSONRedditLinks.slice(0, 5);
    const JSONDataPromises = JSONLinks.map( async (url) => {
        return await fetch(url);
    });
    const JSONSettledPromises = await Promise.allSettled(JSONDataPromises);
    const fulfilledPostData = await Promise.all(JSONSettledPromises.filter((response, index) => {
      return response.status === 'fulfilled' && response.value.ok === true && fulfilledLinks.push(state.input.linkList[index]); //links corresponding to rejected promises are removed
      }).map(response => response.value.json())); 
    const grabData = fulfilledPostData.map((post, index) => {
        const { title, score, subreddit_name_prefixed, selftext, url } = post[0].data.children[0].data;
        const comments = post[1].data.children.map(comment => comment.data.body);
        const smallData = {
            title,
            score,
            subreddit_name_prefixed,
            selftext,
            comments,
            url,
            link: fulfilledLinks[index]
        };
        return smallData;
    })
    return grabData;
  }
)

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
    },
    extraReducers: builder => {
        builder
            .addCase(fetchURLData.pending, (state) => {
                state.isFetchingPostData = true;
                state.failedFetchingPostData = false;
            })
            .addCase(fetchURLData.fulfilled, (state, action) => {
                console.log(`extra reducer:`);
                console.log(action.payload);
                state.postObjects = action.payload;
                state.isFetchingPostData = false;
                state.failedFetchingPostData = false;
            })
            .addCase(fetchURLData.rejected, (state) => {
                state.isFetchingPostData = false;
                state.failedFetchingPostData = true;
            })
    }
})

export const loadJSON = postDataSlice.actions.loadJSON;
export const selectLoading = state => state.postData.isFetchingPostData;
export const selectJSONLinks = state => state.postDataSlice.JSONRedditLinks;
export const selectPostObjects  = state => state.postData.postObjects;
export default postDataSlice.reducer;
