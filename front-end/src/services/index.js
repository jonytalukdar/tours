import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const defaultOptions = {
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
};

const API = axios.create(defaultOptions);

API.interceptors.request.use((req) => {
  const token = Cookies.get('jwt');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const fetchTours = createAsyncThunk('tours/fetchTours', async () => {
  try {
    const { data } = await API.get('/tours');
    return data.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const signin = createAsyncThunk(
  'signin',
  async ({ userData, history }) => {
    try {
      const { data } = await API.post('/users/login', userData);
      Cookies.set('jwt', data.token);

      history.push('/');
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);
