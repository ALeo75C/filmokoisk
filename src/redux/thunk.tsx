import { createAsyncThunk } from "@reduxjs/toolkit";
import { resMoviesSearchType, ArgsType, FullMovieInfo } from "../types";
import { RootState } from "./store";

const url: {[key in string]: string} =  {
    root: 'http://localhost:3030',
    apiV: '/api/v1',
    login: '/login',
    movie: '/movie/',
    search: '/search'
}

const getMoviesUrl = (breakPoint: string, args?: ArgsType): string => {
    let query = ''
    if (args) {
        const str = []
        for(const key of Object.keys(args)) {
            if (args[key]) {
                str.push(`${key}=${args[key]}`)
            }
        }
        query = '?' + str.join('&')
    }
    return url.root + url.apiV + url[breakPoint] + query
}

const getFilmUrl = (breakPoint: string, id: number): string => {
    return url.root + url.apiV + url[breakPoint] + id
}

export const getMovies = createAsyncThunk<
    resMoviesSearchType,
    ArgsType,
    { rejectValue: string, state: RootState }>
    (
    'movies/getMovies',
    async (args, { rejectWithValue }) => {
        try {
            const response = await fetch(getMoviesUrl('search', args));
            if (!response.ok) {
                return rejectWithValue('empty');
            }
            const data: resMoviesSearchType = await response.json();
            return data;
        } catch (error: unknown) {
            let errorMessage = 'An unknown error occurred';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return rejectWithValue(errorMessage);
        }
    }, {}
);

export const getFilm = createAsyncThunk<
    FullMovieInfo,
    number,
    { rejectValue: string, state: RootState }>
    (
    'film/getFilm',
    async (args, { rejectWithValue }) => {
        try {
            const response = await fetch(getFilmUrl('movie', args));
            if (!response.ok) {
                return rejectWithValue('empty');
            }
            const data: FullMovieInfo = await response.json();
            return data;
        } catch (error: unknown) {
            let errorMessage = 'An unknown error occurred';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return rejectWithValue(errorMessage);
        }
    },  { }
);