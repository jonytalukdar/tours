import { createSlice } from '@reduxjs/toolkit';
import { signin, updatePassword, updateProfile } from '../../services';
import cookie from 'js-cookie';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('user');
      cookie.remove('jwt');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // for signin
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
        state.error = action.payload;
      })

      //update profile
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'success';
        localStorage.setItem(
          'user',
          JSON.stringify({ ...action?.payload?.data })
        );
        state.user = action.payload.data;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })

      ///update password
      .addCase(updatePassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = 'success';
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
