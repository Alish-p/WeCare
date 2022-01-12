import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// First, create the thunk
export const registerCoach = createAsyncThunk(
  'coachAuth/registerCoach',
  async (coach) => {
    const response = await axios.post('http://localhost:5000/coaches/', coach);
    return response.data;
  }
);

export const loginCoach = createAsyncThunk(
  'coachAuth/loginCoach',
  async (coach) => {
    const response = await axios.post(
      'http://localhost:5000/coaches/login',
      coach
    );
    return { data: response.data, coach };
  }
);

export const findAllAppointments = createAsyncThunk(
  'coachAuth/findAllAppointments',
  async (coachId) => {
    const response = await axios.get(
      `http://localhost:5000/coaches/booking/${coachId}`
    );
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
    },
    [registerCoach.rejected]: (state, action) => {
      state.isRegistered = false;
      state.coachId = '';
    },
    [loginCoach.fulfilled]: (state, action) => {
      state.isLogged = true;
      state.error = '';
      state.coachId = action.payload.coach.id;
    },
    [loginCoach.rejected]: (state, action) => {
      state.isLogged = false;
      state.error = 'Invalid Credentials';
    },
    [findAllAppointments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bookings = action.payload;
    },
    [findAllAppointments.rejected]: (state, action) => {
      state.isLoading = false;
      state.bookings = [];
    },

    [findAllAppointments.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logoutCoach } = coachAuthSlice.actions;

export default coachAuthSlice.reducer;
