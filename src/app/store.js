import { configureStore } from '@reduxjs/toolkit';
import { inputReducer } from '../features/Components/InputField/InputFieldSlice';

export const store = configureStore({
  reducer: {
    input: inputReducer
  },
});
