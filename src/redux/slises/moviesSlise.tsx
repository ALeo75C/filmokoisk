import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import { getMovies } from '../thunk'

const entityAdapter = createEntityAdapter()

export const moviesSlice = createSlice({
    name: 'movie',
    initialState: entityAdapter.getInitialState({requestStatus: 'idle', totalPages: 1}),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.pending, (state) => {
                state.requestStatus = 'pending'
            })
            .addCase(getMovies.fulfilled, (state, {payload}) => {
                entityAdapter.setAll(state, payload.search_result)
                state.totalPages = payload.total_pages
                state.requestStatus = 'fulfilled'
            })
            .addCase(getMovies.rejected, (state, payload) => {
                console.log(payload.error.message)
                state.requestStatus = 'rejected'
            })
    }
})

// export const {addMovie} = movieSlice.actions