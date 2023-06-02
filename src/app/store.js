import { configureStore } from '@reduxjs/toolkit';
import { inputReducer } from '../Components/InputField/InputFieldSlice';
import postDataReducer from '../Components/DisplayPosts/postDataSlice';

export const store = configureStore({
  reducer: {
    input: inputReducer,
    postData: postDataReducer,
  },
});
