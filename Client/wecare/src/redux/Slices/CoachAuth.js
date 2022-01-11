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
  isLoading: false,
  bookings: [],
};

export const coachAuthSlice = createSlice({
  name: 'coachAuth',
  initialState,
  reducers: {
    logoutCoach: (state) => {
      state.user = {};
      state.bookings = [];
      state.isRegistered = false;
      state.isLogged = false;
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
      state.isLoading = false;
      state.bookings = action.payload;
      console.log('Bookings fetched', action.payload);
    },
    [findAllAppointments.rejected]: (state, action) => {
      state.isLoading = false;
      state.bookings = [];
      console.log('Bookings not fetched', action.payload);
    },

    [findAllAppointments.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logoutCoach } = coachAuthSlice.actions;

export default coachAuthSlice.reducer;
