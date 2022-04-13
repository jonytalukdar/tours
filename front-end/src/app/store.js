import { configureStore } from '@reduxjs/toolkit';

import tourReducer from '../features/tour/tourSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: { tour: tourReducer, auth: authReducer },
});
