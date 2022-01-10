import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// First, create the thunk
export const getAllCoaches = createAsyncThunk(
  'coaches/getAllCoaches',
  async () => {
    const response = await axios.get('http://localhost:5000/coaches/all');
    return response.data;
  }
);

const initialState = {
  coaches: [],
  isLoading: false,
};

export const coachesSlice = createSlice({
  name: 'coaches',
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isRegistered = true;
      state.userId = action.payload.message;
    },
    registerFailed: (state) => {
      state.isRegistered = false;
      state.userId = '';
    },
  },
  extraReducers: {
    [getAllCoaches.pending]: (state, action) => {
      state.isLoading = true;
      state.coaches = action.payload;
      console.log('Fetched', action.payload);
    },
    [getAllCoaches.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.coaches = action.payload;
      console.log('Fetched', action.payload);
    },
    [getAllCoaches.rejected]: (state, action) => {
      state.isRegistered = false;
      state.userId = '';
      console.log('Wrong', action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { registerSuccess, registerFailed } = coachesSlice.actions;

export default coachesSlice.reducer;
