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
export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setSelectedLocation: (state, action: PayloadAction<Location | null>) => {
      state.selectedLocation = action.payload;
    },
    // Any other location-related reducers can go here
  },
  // Include async thunks if necessary
});

// Export the action(s) and reducer
export const { setSelectedLocation } = locationSlice.actions;
export default locationSlice.reducer;
