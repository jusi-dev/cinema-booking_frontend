import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    halls: {},
}

export const hallsSlice = createSlice({
    name: 'halls',
    initialState,
    reducers: {
        setHalls: (state, action) => {
            state.halls = action.payload
        }
    }
})  

export const { setHalls } = hallsSlice.actions

export default hallsSlice.reducer