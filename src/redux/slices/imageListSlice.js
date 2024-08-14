import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { axiosInstance } from 'components/apis';

export const fetchPhotos = createAsyncThunk(
    'photos/fetchPhotos',
    async (params) => {
        const { query, page } = params
        const response = await axiosInstance(`images?query=${query}&page=${page}`);
        return response.data;
    },
);

const initialState = {
    photos: [],
    status: 'idle',
    error: null,
    current_page: 1,
    scroll_position_id: null,
    category: "",
    pageLoading: false,
    search: ""
};


const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        increment: (state) => {
            state.current_page += 1
        },
        decrement: (state) => {
            if (state.current_page > 0) {
                state.current_page -= 1
            }
        },
        incrementByAmount: (state, action) => {
            state.current_page += action.payload
        },
        scroll_position: (state, action) => {
            state.scroll_position_id = action.payload
        },
        setCategory: (state, action) => {
            state.category = action.payload
        },
        setPageLoading: (state, action) => {
            state.status = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhotos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPhotos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.photos = action.payload;
            })
            .addCase(fetchPhotos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});
export const { increment, decrement, incrementByAmount, scroll_position, setCategory, setPageLoading, setSearch } = photosSlice.actions


export const photoReducer = photosSlice.reducer;