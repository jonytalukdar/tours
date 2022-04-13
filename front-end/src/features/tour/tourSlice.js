import { createSlice } from '@reduxjs/toolkit';
import { fetchTours } from '../../services';

const initialState = {
  tours: [],
  status: 'idle',
  error: null,
};

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.status = 'success';
        state.tours = action.payload;
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default tourSlice.reducer;
