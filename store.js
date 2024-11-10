import { configureStore } from '@reduxjs/toolkit';
import donutReducer from './features/donutSlice';

const store = configureStore({
  reducer: {
    donuts: donutReducer, // Sử dụng reducer từ donutSlice
  },
});

export default store;
