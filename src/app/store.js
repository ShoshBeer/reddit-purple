import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { linksReducer } from '../features/Components/FindLinksToReddit/FindLinksToRedditSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    links: linksReducer
  },
});
