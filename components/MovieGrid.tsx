import styles from './MovieGrid.module.css'
import { Movie } from "@/lib/interfaces/movie";
import MoviePoster from "@/components/MoviePoster";
import { getPopularMovies } from "@/lib/tmdb/tmdb";

interface Props {
    content: Movie[]
}

const MovieGrid = ({content}: Props) => {


    return (
        <ul className={styles.grid}>
            {content.map((movie: Movie) => (
                <MoviePoster key={movie.id} movie={movie}/>
            ))}
        </ul>
    );
};

export default MovieGrid;
