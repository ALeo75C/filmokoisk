import { useSelector } from "react-redux";
import { selectMovieById } from "../redux/selectors";

import '../styles/MovieCard.css'
import Score from "./score";
import { RootState } from "../redux/store";
import { ShortMovieInfo } from "../types";

interface MovieCardProps {
    id: string;
    handleClick: () => void
}

const MovieCard: React.FC<MovieCardProps> = ({id, handleClick}) => {
    const movie: ShortMovieInfo = useSelector((state: RootState) => selectMovieById(state, id)) as ShortMovieInfo
    return (
        <div onClick={handleClick} className="MovieCard">
            <div className="poster" style={{backgroundImage: `url(${movie.poster})`}} />
            <div className="info">
                <h2>{movie.title}</h2>
                <div className="infoBlock">
                    <span>Жанр</span>
                    <p>{movie.genre}</p>
                </div>
                <div className="infoBlock">
                    <span>Год выпуска</span>
                    <p>{movie.release_year}</p>
                </div>
                <div className="infoBlock">
                    <span>Описание</span>
                    <p>{movie.description}</p>
                </div>
            </div>
            <Score val={Number(movie.rating)}/>
        </div>
    )
}

export default MovieCard