import { createSlice } from '@reduxjs/toolkit';
import { signin } from '../../services';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = 'success';
        localStorage.setItem(
          'user',
          JSON.stringify({ ...action?.payload?.data })
        );
        state.user = action.payload.data;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
