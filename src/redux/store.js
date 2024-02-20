import { configureStore } from '@reduxjs/toolkit';
import movivesSliceReducer from './slices/moviesSlice';
import hallsSliceReducer from './slices/hallsSlice';
import ticketsSliceReducer from './slices/ticketSlice'

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const reducer = combineReducers({
    movies: movivesSliceReducer,
    halls: hallsSliceReducer,
    tickets: ticketsSliceReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer
})