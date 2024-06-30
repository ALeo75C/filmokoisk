import {createSlice} from '@reduxjs/toolkit'
import { getFilm } from '../thunk'
import { Actor } from '../../types'


type initialStateType = {
    requestStatus: string,
    film?: {
        id: string,
        description: string,
        genre: string,
        poster: string,
        rating: string,
        release_year: number,
        title: string
        total_rates_count: string
    }
    actors?: Actor[]
}

const initialState: initialStateType = {
    requestStatus: 'idle',
}

export const filmSlice = createSlice({
    name: 'film',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFilm.pending, (state) => {
                state.requestStatus = 'pending'
            })
            .addCase(getFilm.fulfilled, (state, {payload}) => {
                state.film = {
                    id: payload.id,
                    description: payload.description,
                    genre: payload.genre,
                    poster: payload.poster,
                    rating: payload.rating,
                    release_year: payload.release_year,
                    title: payload.title,
                    total_rates_count: payload.total_rates_count
                }
                state.actors = payload.actors
                state.requestStatus = 'fulfilled'
            })
            .addCase(getFilm.rejected, (state, payload) => {
                console.log(payload.error.message)
                state.requestStatus = 'rejected'
            })
    }
})

// export const {addMovie} = movieSlice.actions