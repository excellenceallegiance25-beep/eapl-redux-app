// store/slices/loadingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false,
        gifUrl: null,
        size: 60
    },
    reducers: {
        startLoading: (state, action) => {
            state.isLoading = true;
            state.gifUrl = action.payload.gifUrl;
            state.size = action.payload.size || 60;
        },
        stopLoading: (state) => {
            state.isLoading = false;
            state.gifUrl = null;
        }
    }
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;