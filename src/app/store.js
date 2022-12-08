import { configureStore } from '@reduxjs/toolkit';
import { inputReducer } from '../features/Components/InputField/InputFieldSlice';
import postDataReducer from '../features/Components/DisplayPosts/postDataSlice';

export const store = configureStore({
  reducer: {
    input: inputReducer,
    postData: postDataReducer,
  },
});
