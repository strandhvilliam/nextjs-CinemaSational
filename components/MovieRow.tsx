import styles from './MovieRow.module.css'
import { Movie } from "@/lib/interfaces/movie";
import MoviePoster from "@/components/MoviePoster";


interface Props {
    content: Movie[]
}

const MovieRow = ({ content }: Props) => {

    return (
        <ul className={styles.row}>
            {content.map((movie: Movie) => (
                <MoviePoster key={movie.id} movie={movie}/>
            ))}
        </ul>
    )
}

export default MovieRow;
