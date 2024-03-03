import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// Assuming Location is imported from your centralized types directory
import { Location } from '@/types/Location';

interface LocationState {
  selectedLocation: Location | null;
}

const initialState: LocationState = {
  selectedLocation: null,
};

export const fetchLocation = createAsyncThunk('location/fetchlocation',async(searchQuery:string,{dispatch})=>{
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?limit=6&q=${searchQuery}&appid=${apiKey}`);
  const data = await response.json();
  return data; 
})
export const fetchLocationFromLatLong = createAsyncThunk('location/fetchlocation',async(coords:any,{dispatch})=>{
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  console.log("Coords: ",coords)
  const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.lon}&limit=6&appid=${apiKey}`);
  const data = await response.json();
  console.log("Data is: ",data[0])
  dispatch(setSelectedLocation(data[0]));
  return data; 
})
export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setSelectedLocation: (state, action: PayloadAction<Location | null>) => {
      state.selectedLocation = action.payload;
    },
  },
});

export const { setSelectedLocation } = locationSlice.actions;
export default locationSlice.reducer;
