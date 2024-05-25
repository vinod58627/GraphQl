import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './RootReducer'; // Assuming you have your slices defined in a separate file

const store = configureStore({
  reducer: rootReducer,
});

export default store;