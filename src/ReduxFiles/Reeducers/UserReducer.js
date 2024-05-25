// slices/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk for fetching users
export const fetchUser = createAsyncThunk(
  'user/fetchUsers',
  async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
  }
);

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default userSlice.reducer;
