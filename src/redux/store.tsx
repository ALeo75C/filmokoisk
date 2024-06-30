import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "./slises/moviesSlise";
import { filmSlice } from "./slises/filmSlise";


export const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer,
        film: filmSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;