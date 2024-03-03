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
// Helper function to convert Kelvin to Celsius
function convertKelvinToCelsius(kelvin:number) {
  return kelvin - 273.15;
}

function convertDate(unixTimestamp:number,timezoneOffset:number){
  // Example Unix timestamp and timezone offset from the API response

// Convert Unix timestamp to milliseconds (JavaScript Date uses milliseconds)
const date: Date = new Date(unixTimestamp * 1000);

// Adjust for the timezone offset
// JavaScript's Date object timezone offset is in minutes and returns the difference in minutes between UTC and the local time,
// so we convert the API's timezone offset from seconds to minutes and invert it to match JavaScript's convention.
const localDate: Date = new Date(date.getTime());

// Formatting the date and time
const options: Intl.DateTimeFormatOptions = {
  weekday: 'long', // "long" for the full name of the day, "short" for the abbreviated name.
  hour: '2-digit', // "2-digit" for a two-digit numerical value.
  minute: '2-digit', // "2-digit" for a two-digit numerical value.
  hour12: false // false to use the 24-hour clock.
};

// Use Intl.DateTimeFormat for a formatted string based on the user's locale and options for displaying date and time parts
const formattedDate: string = new Intl.DateTimeFormat('en-US', options).format(localDate);

console.log(formattedDate); // Prints the local date, time, and day of the week in a readable format

return formattedDate
}

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (location:Location) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`);
  const data = await response.json()
  // Convert current temperature
  if (data.current) {
    data.current.temp = convertKelvinToCelsius(data.current.temp);
    data.current.feels_like = convertKelvinToCelsius(data.current.feels_like);
  }

  // Convert hourly temperatures
  data.hourly.forEach(hour => {
    hour.temp = convertKelvinToCelsius(hour.temp);
    hour.feels_like = convertKelvinToCelsius(hour.feels_like);
  });

  // Convert daily temperatures
  data.daily.forEach(day => {
    day.temp.day = convertKelvinToCelsius(day.temp.day);
    day.temp.min = convertKelvinToCelsius(day.temp.min);
    day.temp.max = convertKelvinToCelsius(day.temp.max);
    day.temp.night = convertKelvinToCelsius(day.temp.night);
    day.temp.eve = convertKelvinToCelsius(day.temp.eve);
    day.temp.morn = convertKelvinToCelsius(day.temp.morn);
    day.feels_like.day = convertKelvinToCelsius(day.feels_like.day);
    day.feels_like.night = convertKelvinToCelsius(day.feels_like.night);
    day.feels_like.eve = convertKelvinToCelsius(day.feels_like.eve);
    day.feels_like.morn = convertKelvinToCelsius(day.feels_like.morn);
  });
  data.current.dt = convertDate(data.current.dt,data.timezone_offset);

  return data;
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
