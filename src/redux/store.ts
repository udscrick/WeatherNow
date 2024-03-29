// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './features/weather/weatherSlice';
import locationReducer from './features/location/locationSlice';
import imageReducer from './features/image/imageSlice';
import aqiReducer from './features/aqi/aqiSlice';
import loadingReducer from './features/loading/loadingSlice';
import { weatherMiddleware } from './middlewares/weatherMiddleware';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    location: locationReducer,
    aqi: aqiReducer,
    image: imageReducer,
    loading: loadingReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
