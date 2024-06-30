import MovieCard from "./MovieCard";
import Loader from "./loader";

import { useSelector } from "react-redux"
import { RootState } from '../redux/store'

import ErrorPage from "../Pages/ErrorPage";
import { useNavigate } from "react-router-dom";


const MovieCardCollection: React.FC = () => {
    const navigate = useNavigate()
    const movies = useSelector((state: RootState) => state.movies);
        
    if (movies.requestStatus !== 'fulfilled') {
        return <Loader />;
    }
    
    return (
        movies.ids.length > 0 ? (
            <div className="CardsCollection">
                {movies.ids.map(id => {
                  return <MovieCard key={id} id={String(id)} handleClick={() => navigate(`/movie/${id}`)} />
                })}
            </div>
    ) : (
      <ErrorPage />
    )
  );
}

export default MovieCardCollection