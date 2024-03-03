import { Location } from '@/types/Location';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


interface WeatherState {
  data: any; // Specify a more detailed type based on your data structure
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  status: 'idle',
  error: null,
};

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (location:Location) => {
  console.log("Location: ",location);
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`);
  console.log("Weather Response: ",await response.json())
  return (await response.json()) as any; 
});

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    // Define reducers here
    setWeatherForLocation: (state,action) => {
      state.data = action.payload;
      state.error = null;
      state.status = 'succeeded';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<any>) => { 
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  },
});
export default weatherSlice.reducer;
