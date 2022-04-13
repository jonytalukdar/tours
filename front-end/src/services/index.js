import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const defaultOptions = {
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
};

const API = axios.create(defaultOptions);

// API.interceptors.request.use((req) => {
//   const result = JSON.parse(localStorage.getItem('profile'));
//   if (result) {
//     req.headers.Authorization = `Bearer ${result.token}`;
//   }

//   return req;
// });

export const fetchTours = createAsyncThunk('tours/fetchTours', async () => {
  try {
    const { data } = await API.get('/tours');
    return data.data;
  } catch (error) {
    console.log(error);
  }
});
