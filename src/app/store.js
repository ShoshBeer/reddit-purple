import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { linksReducer } from '../features/Components/FindLinksToReddit/FindLinksToRedditSlice';
import { inputReducer } from '../features/Components/InputField/InputFieldSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    links: linksReducer,
    input: inputReducer
  },
});
