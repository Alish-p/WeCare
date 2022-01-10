import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// First, create the thunk
export const registerUser = createAsyncThunk(
  'userAuth/registerUser',
  async (user) => {
    console.log(JSON.stringify(user));
    const response = await axios.post('http://localhost:5000/users/', user);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'userAuth/loginUser',
  async (user) => {
    const response = await axios.post(
      'http://localhost:5000/users/login',
      user
    );
    return { data: response.data, user };
  }
);
export const bookAppointment = createAsyncThunk(
  'userAuth/bookAppointment',
  async ({ userId, coachId, appointment }) => {
    const response = await axios.post(
      `http://localhost:5000/users/booking/${userId}/${coachId}`,
      appointment
    );
    return response.data;
  }
);

const initialState = {
  isRegistered: false,
  userId: '',
  isLogged: false,
  error: '',
};

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setBooked: (state, action) => {
      state.booked = action.payload.booked;
    },
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.isRegistered = true;
      state.userId = action.payload.message;
      console.log('Succeed', action.payload);
    },
    [registerUser.rejected]: (state, action) => {
      state.isRegistered = false;
      state.userId = '';
      console.log('Failed', action.payload);
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLogged = true;
      state.userId = action.payload.user.id;
      state.isRegistered = true;
      state.error = '';
    },
    [loginUser.rejected]: (state, action) => {
      state.isLogged = false;
      state.userId = '';

      state.error = 'Invalid Credentials';

      console.log('Failed', action.payload);
    },
    [bookAppointment.fulfilled]: (state, action) => {
      state.isLogged = true;
      state.isRegistered = true;
      state.booked = true;
      state.error = '';
    },
    [bookAppointment.rejected]: (state, action) => {
      console.log('Failed', action);
      state.isLogged = false;
      state.error = 'There is an appointment in this slot already';
      state.booked = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBooked } = userAuthSlice.actions;

export default userAuthSlice.reducer;
