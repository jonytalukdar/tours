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
  async ({ userData, history }, { rejectWithValue }) => {
    try {
      const { data } = await API.post('/users/login', userData);
      Cookies.set('jwt', data.token);

      history.push('/');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'updateProfile',
  async (userData, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('photo', userData.photo);

    try {
      const { data } = await API.patch('/users/updateProfile', formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  'updatePassword',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await API.patch('/users/updatePassword', userData);
      Cookies.set('jwt', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
