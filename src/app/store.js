import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postDataReducer from '../features/Components/DisplayPosts/postDataSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    postData: postDataReducer,
  },
});
