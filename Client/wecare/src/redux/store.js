import { configureStore } from '@reduxjs/toolkit';
import coachReducer from './Slices/CoachAuth';
import userReducer from './Slices/UserAuth';
import coachesReducer from './Slices/Coaches';

export const store = configureStore({
  reducer: { coach: coachReducer, user: userReducer, coaches: coachesReducer },
});
