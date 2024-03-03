import { convertDate } from '@/app/utilities/convertUnixToDay';
import { RootState } from '@/redux/store';
import { Location } from '@/types/Location';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setLoading } from '../loading/loadingSlice';


interface WeatherState {
  data: any; // Use a more specific type for your data structure
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  temperatureUnit: 'C' | 'F';
}

const initialState: WeatherState = {
  data: null,
  status: 'idle',
  error: null,
  temperatureUnit: 'C',
};

// Conversion utility functions
const convertKelvinToCelsius = (kelvin: number) => kelvin - 273.15;
const convertCelsiusToFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32;
const convertFahrenheitToCelsius = (fahrenheit:number) => (fahrenheit - 32) * 5 / 9;


function convertTemperatures(data: any, targetUnit: string) {
  if (!data) return;

  const convertFn = targetUnit === 'F' ? convertCelsiusToFahrenheit : convertFahrenheitToCelsius;

  // Convert 'current' temperatures
  if (data.current) {
    data.current.temp = convertFn(data.current.temp);
    data.current.feels_like = convertFn(data.current.feels_like);
  }

  // Convert 'hourly' temperatures
  data.hourly.forEach((hour: any) =>{
    hour.temp = convertFn(hour.temp)
    hour.feels_like = convertFn(hour.feels_like);

  });

  // Convert 'daily' temperatures
  data.daily.forEach((day:any) => {
    day.temp.day = convertFn(day.temp.day);
    day.temp.min = convertFn(day.temp.min);
    day.temp.max = convertFn(day.temp.max);
    day.temp.night = convertFn(day.temp.night);
    day.temp.eve = convertFn(day.temp.eve);
    day.temp.morn = convertFn(day.temp.morn);
    day.feels_like.day = convertFn(day.feels_like.day);
    day.feels_like.night = convertFn(day.feels_like.night);
    day.feels_like.eve = convertFn(day.feels_like.eve);
    day.feels_like.morn = convertFn(day.feels_like.morn);
  });

  return data;
}

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (location: Location,{getState,dispatch}) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  dispatch(setLoading(true))
  const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`);
  const data = await response.json();
  dispatch(setLoading(false))
  // Convert temperatures from Kelvin to Celsius as soon as data is fetched
  const convertTemperaturesToCelsius = (data: any) => {
    if (data.current) {
      data.current.temp = convertKelvinToCelsius(data.current.temp);
      data.current.feels_like = convertKelvinToCelsius(data.current.feels_like);
    }

    data.hourly.forEach((hour: any) => {
      hour.temp = convertKelvinToCelsius(hour.temp);
      hour.feels_like = convertKelvinToCelsius(hour.feels_like);
    });

    data.daily.forEach((day: any) => {
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
    console.log("Datee: ",data.current.dt);
    data.current.sunrise = convertDate(data.current.sunrise);
    data.current.sunset = convertDate(data.current.sunset);
    
    const { temperatureUnit } = (getState() as RootState).weather;
    // If the current preference is Fahrenheit, convert the data before saving
    if (temperatureUnit === 'F') {
      data = convertTemperatures(data, 'F');
    }
    return data;
  };

  return convertTemperaturesToCelsius(data);
});

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    toggleTemperatureUnit: (state) => {
      const targetUnit = state.temperatureUnit === 'C' ? 'F' : 'C';
      state.data = convertTemperatures(state.data, targetUnit);
      state.temperatureUnit = targetUnit;
    },
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

export const { toggleTemperatureUnit } = weatherSlice.actions;
export default weatherSlice.reducer;
