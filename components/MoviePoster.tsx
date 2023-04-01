import styles from './MoviePoster.module.css'
import Image from "next/image";
import { Movie } from "@/lib/interfaces/movie";
import Link from "next/link";

interface Props {
    movie: Movie
}

const IMG_URL: string = "https://image.tmdb.org/t/p/original";


const MoviePoster = ({movie}: Props) => {


    const image = movie.posterPath ? `${IMG_URL}${movie.posterPath}` : "/no-image.png";

    return (
        <li className={styles.poster}>
            <Link href={`/movie/${movie.id}`}>
                <Image className={styles.image} src={image} alt={`${movie.title}`}
                       width={200} height={300}/>
                <div className={styles.content}>
                    <h3>{movie.title}</h3>
                    <p>{movie.releaseDate}</p>
                </div>
            </Link>
        </li>
    );
};

export default MoviePoster;
