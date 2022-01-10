import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// First, create the thunk
export const registerCoach = createAsyncThunk(
  'coachAuth/registerCoach',
  async (coach) => {
    console.log(JSON.stringify(coach));
    const response = await axios.post('http://localhost:5000/coaches/', coach);
    return response.data;
  }
);

export const loginCoach = createAsyncThunk(
  'coachAuth/loginCoach',
  async (coach) => {
    console.log(JSON.stringify(coach));
    const response = await axios.post(
      'http://localhost:5000/coaches/login',
      coach
    );
    console.log(response.data);
    return { data: response.data, coach };
  }
);

export const findAllAppointments = createAsyncThunk(
  'coachAuth/findAllAppointments',
  async (coachId) => {
    console.log(`http://localhost:5000/coaches/booking/${coachId}`);

    const response = await axios.get(
      `http://localhost:5000/coaches/booking/${coachId}`
    );
    console.log(response.data);
    return response.data;
  }
);

const initialState = {
  isRegistered: false,
  isLogged: false,
  coachId: '',
  error: '',
  bookings: [],
};

export const coachAuthSlice = createSlice({
  name: 'coachAuth',
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isRegistered = true;
      state.coachId = action.payload.message;
    },
    registerFailed: (state) => {
      state.isRegistered = false;
      state.coachId = '';
    },
  },
  extraReducers: {
    [registerCoach.fulfilled]: (state, action) => {
      state.isRegistered = true;
      state.coachId = action.payload.message;
      console.log('Succeed', action.payload);
    },
    [registerCoach.rejected]: (state, action) => {
      state.isRegistered = false;
      state.coachId = '';
      console.log('Failed', action.payload);
    },
    [loginCoach.fulfilled]: (state, action) => {
      state.isLogged = true;
      state.error = '';
      state.coachId = action.payload.coach.id;
      console.log('Succeed', action.payload);
    },
    [loginCoach.rejected]: (state, action) => {
      state.isLogged = false;
      state.error = 'Invalid Credentials';
      console.log('Failed', action.payload);
    },
    [findAllAppointments.fulfilled]: (state, action) => {
      state.bookings = action.payload;
      console.log('Bookings fetched', action.payload);
    },
    [findAllAppointments.rejected]: (state, action) => {
      state.bookings = action.payload;
      console.log('Bookings not fetched', action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { registerSuccess, registerFailed } = coachAuthSlice.actions;

export default coachAuthSlice.reducer;
