import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../redux/store";
import { getFilm } from "../redux/thunk";
// import MovieCard from "../components/MovieCard";
import ErrorPage from "./ErrorPage";
import Score from "../components/score";

import '../styles/FilmPage.css'
import ActorsBlock from "../components/ActorsCardsCollection";

export default function FilmPage() {
    // const [searchParams, setSearchParams] = useSearchParams()
    const {movieId} = useParams()
    const response = useSelector((state: RootState) => state.film);
    const dispatch: AppDispatch = useDispatch()

    if (response.requestStatus === 'idle') {
        dispatch(getFilm(Number(movieId)))
    }

    const {film, actors} = response
    console.log(actors)
    return (
        film ? (
            <div className="FilmPage">
                <div className="MovieCard">
                    <div className="poster" style={{backgroundImage: `url(${film.poster})`}} />
                    <div className="info">
                        <div className="header">
                            <h2>{film.title}</h2>
                            <Score val={Number(film.rating)}/>
                        </div>
                        <div className="infoBlock">
                            <span>Жанр:</span>
                            <p>{film.genre}</p>
                        </div>
                        <div className="infoBlock">
                            <span>Год выпуска:</span>
                            <p>{film.release_year}</p>
                        </div>
                        <div className="infoBlock">
                            <span>Рейтинг:</span>
                            <p>{film.rating}</p>
                        </div>
                        <div className="infoBlock _">
                            <span>Описание:</span>
                            <br/>
                            <p>{film.description}</p>
                        </div>
                    </div>
                </div>
                <ActorsBlock actors={actors}/>
            </div>
        ) : (
            <ErrorPage />
        )
    )
}