import { Location } from '@/types/Location';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


interface AqiState {
    aqi: string | null; 
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
 
  }
  
  const initialState: AqiState = {
    aqi: null,
    status: 'idle',
    error: null,
  };
  const interpretAQI = (aqi:number) => {
    switch (aqi) {
      case 1:
        return 'Good';
      case 2:
        return 'Fair';
      case 3:
        return 'Moderate';
      case 4:
        return 'Poor';
      case 5:
        return 'Very Poor';
      default:
        return 'Unknown';
    }
  };
export const fetchAQI = createAsyncThunk('aqi/fetchAQI', async (location: Location) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`);
  const data = await response.json();
  let aqi
  if(data){
    console.log("Data: ",data)
    if(data?.list?.length>0){
        aqi = interpretAQI(data?.list[0]?.main?.aqi ?? 0)
    }
  }
  console.log("Aqi Data: ",aqi)
  return aqi; // Adjust based on your API's response structure
});

const aqiSlice = createSlice({
  name: 'aqi',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAQI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAQI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.aqi = action.payload ?? null;
      })
      .addCase(fetchAQI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  },
});

export default aqiSlice.reducer;
