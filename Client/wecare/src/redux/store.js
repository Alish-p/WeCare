import { configureStore } from '@reduxjs/toolkit';
import coachReducer from './Slices/Auth';

export const store = configureStore({
  reducer: { coach: coachReducer },
});
