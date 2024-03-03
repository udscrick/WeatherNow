import { Image } from "@/types/Image";
import { Location } from "@/types/Location"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface ImageState {
    data: Image | null; 
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
const initialState:ImageState = {
    data: null,
    status: 'idle',
    error: null

}

export const fetchImage = createAsyncThunk('image/fetch',async(locationInfo:Location,{dispatch})=>{
    const api_key = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY
    const imageResponse = await fetch(`https://api.unsplash.com/search/photos?client_id=${api_key}&query=${locationInfo.name}`)
    const imageResponseJSON = await imageResponse.json();
    const selectedImage = imageResponseJSON.results.length > 0 ? imageResponseJSON.results[0] : null
    dispatch(setImageInfo(selectedImage))
    return selectedImage;
})

export const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setImageInfo: (state, action: PayloadAction<Image | null>) => {
            state.data = action.payload;
            state.error = null;
            state.status = 'succeeded'
          },
    }
})

export const { setImageInfo } = imageSlice.actions;
export default imageSlice.reducer;

