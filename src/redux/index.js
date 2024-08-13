import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { photoReducer } from "./slices/imageListSlice";
import { photoByIdReducer } from "./slices/imageByIdSlice";

const reducers = combineReducers({
    photos: photoReducer,
    photoById: photoByIdReducer
})

const mainReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        return nextState;
    } else {
        return reducers(state, action);
    }
};

const makeStore = () =>
    configureStore({ reducer: mainReducer, });

export const wrapper = createWrapper(makeStore);