// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './features/weather/weatherSlice';
import locationReducer from './features/location/locationSlice';
import { weatherMiddleware } from './middlewares/weatherMiddleware';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    location: locationReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
