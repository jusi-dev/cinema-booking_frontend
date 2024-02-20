import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tickets: [],
    movieID: "",
}

export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTickets: (state, action) => {
            state.tickets = action.payload
        },
        setMovieID: (state, action) => {
            state.movieID = action.payload
        },
    }
})  

export const { setTickets } = ticketsSlice.actions
export const { setMovieID } = ticketsSlice.actions

export default ticketsSlice.reducer