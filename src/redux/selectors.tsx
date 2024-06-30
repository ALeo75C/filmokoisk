import { RootState } from "../redux/store"

export const selectAllMovies = (state: RootState) => state.movies
export const selectMoviesIds = (state: RootState) => state.movies.ids
export const selectMovieById = (state: RootState, id:string) => selectAllMovies(state).entities[id]

export const selectTotalPage = (state: RootState) => state.movies.totalPages
// export const selectCurrenPage = (state: RootState) => state.movies.currentPage