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

export const rescheduleAppointment = createAsyncThunk(
  'userAuth/rescheduleAppointment',
  async ({ bookingId, appointment }) => {
    const response = await axios.put(
      `http://localhost:5000/booking/${bookingId}`,
      appointment
    );
    return response.data;
  }
);

export const getMyAppointments = createAsyncThunk(
  'userAuth/getMyAppointments',
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/users/booking/${userId}`
    );
    console.log(response);

    return response.data;
  }
);

export const getMyProfile = createAsyncThunk(
  'userAuth/getMyProfile',
  async (userId) => {
    const response = await axios.get(`http://localhost:5000/users/${userId}`);
    console.log(response);

    return response.data;
  }
);

export const cancelAppointment = createAsyncThunk(
  'userAuth/cancelAppointment',
  async ({ bookingId, userId }) => {
    await axios.delete(`http://localhost:5000/booking/${bookingId}`);
    console.log(`userId:${userId}`);
    console.log(userId);
    const response = await axios.get(
      `http://localhost:5000/users/booking/${userId}`
    );
    console.log(response);

    return response.data;
  }
);

const initialState = {
  isRegistered: false,
  isLogged: localStorage.getItem('userId') ? true : false,
  isLoading: false,
  userId: localStorage.getItem('userId') || '',
  error: '',
  myAppointments: [],
  booked: false,
  user: {},
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
    logoutUser: (state) => {
      state.user = {};
      state.myAppointments = [];
      state.isRegistered = false;
      state.isLogged = false;
      state.userId = '';
      localStorage.removeItem('userId');
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
      localStorage.setItem('userId', action.payload.user.id);
    },
    [loginUser.rejected]: (state, action) => {
      state.isLogged = false;
      state.userId = '';
      localStorage.setItem('userId', '');

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
    [rescheduleAppointment.fulfilled]: (state, action) => {
      state.isLogged = true;
      state.isRegistered = true;
      state.booked = true;
      state.error = '';
    },
    [rescheduleAppointment.rejected]: (state, action) => {
      console.log('Failed', action);
      state.isLogged = false;
      state.error = 'There is an appointment in this slot already';
      state.booked = false;
    },

    [getMyAppointments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.myAppointments = action.payload;
    },
    [getMyAppointments.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyAppointments.rejected]: (state, action) => {
      console.log('Failed', action);
      state.myAppointments = [];
      state.error = 'wrong';
      state.isLoading = false;
    },
    [cancelAppointment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.myAppointments = action.payload;
    },
    [cancelAppointment.pending]: (state) => {
      state.isLoading = true;
    },
    [cancelAppointment.rejected]: (state, action) => {
      console.log('Failed', action);
      state.myAppointments = [];
      state.error = 'wrong';
      state.isLoading = false;
    },
    [getMyProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
    [getMyProfile.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBooked, logoutUser } = userAuthSlice.actions;

export default userAuthSlice.reducer;
