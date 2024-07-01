import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "./slises/moviesSlise";
import { filmSlice } from "./slises/filmSlise";
import { userSlice } from "./slises/userSlise";


export const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer,
        film: filmSlice.reducer,
        user: userSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;