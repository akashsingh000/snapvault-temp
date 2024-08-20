import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { axiosInstance } from 'components/apis';

export const fetchPhotoById = createAsyncThunk(
    'photos/fetchPhotoById',
    async (id) => {
        const response = await axiosInstance(`image/${id}`);
        return response.data;
    },
);

const initialState = {
    photo: [],
    status: "idle",
    error: null,
    pageLoading: false
};


const photoByIdSlice = createSlice({
    name: 'photoById',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.status = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhotoById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPhotoById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.photo = action.payload;
            })
            .addCase(fetchPhotoById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })
    },
});

export const { setLoading } = photoByIdSlice.actions

export const photoByIdReducer = photoByIdSlice.reducer;