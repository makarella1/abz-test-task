import { configureStore } from '@reduxjs/toolkit';

import appReducer from './slices/appSlice';
import { api } from './api/api';

export const store = configureStore({
  reducer: {
    app: appReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
