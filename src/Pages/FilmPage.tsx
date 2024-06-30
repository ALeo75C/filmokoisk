import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../redux/store";
import { getFilm } from "../redux/thunk";
import MovieCard from "../components/MovieCard";
import ErrorPage from "./ErrorPage";
import Score from "../components/score";

export default function FilmPage() {
    // const [searchParams, setSearchParams] = useSearchParams()
    const {movieId} = useParams()
    const response = useSelector((state: RootState) => state.film);
    const dispatch: AppDispatch = useDispatch()

    if (response.requestStatus === 'idle') {
        dispatch(getFilm(Number(movieId)))
    }

    console.log(response)
    const {film, actors} = response
    return (
        film ? (
            <div className="FilmPage">
            <div className="MovieCard">
            <div className="poster" style={{backgroundImage: `url(${film.poster})`}} />
            <div className="info">
                <h2>{film.title}</h2>
                <div className="infoBlock">
                    <span>Жанр</span>
                    <p>{film.genre}</p>
                </div>
                <div className="infoBlock">
                    <span>Год выпуска</span>
                    <p>{film.release_year}</p>
                </div>
                <div className="infoBlock">
                    <span>Описание</span>
                    <p>{film.description}</p>
                </div>
            </div>
            <Score val={Number(film.rating)}/>
        </div>
        </div>
        ) : (
            <ErrorPage />
        )
    )
}