import styles from "./MoviePage.module.css";
import { Movie } from "@/lib/interfaces/movie";
import Image from "next/image";
import { getMovieById } from "@/lib/tmdb/tmdb";
import MovieButtons from "@/components/MovieButtons";
import DownButton from "@/components/UI/DownButton";
import PostFeed from "@/components/PostFeed";

const IMG_URL = "https://image.tmdb.org/t/p/original";

const MoviePage = async ({params}: any) => {

    const movie: Movie = await getMovieById(params.movieId);

    return (
        <>
            <div className={styles.container}>
                <MovieView movie={movie}/>
                <DownButton className={styles['down-button']}/>
                <div className={styles.transition}></div>
            </div>
            <div className={styles['post-feed-container']}>
                <PostFeed/>
            </div>
        </>
    );

};

export default MoviePage;


const MovieView = ({movie}: any) => {
    const background = `url(${(IMG_URL.concat(movie.backdropPath))})`

    const optimizeTitle = (title: string) => {
        if (title.includes(":")) {
            return <h1 className={styles.title}>{title.split(":")[0]}:<br/>{title.split(":")[1]}</h1>
        }
        return <h1 className={styles.title}>{title}</h1>
    }

    console.log(movie)

    return (
        <>
            <div className={`${styles.background}`} style={{backgroundImage: `${background}`}}/>
            <div className={styles['background-overlay']}/>
            <div className={styles['movie-container']}>
                <div className={styles.main}>
                    {optimizeTitle(movie.title)}
                    <div className={styles['movie-info']}>
                        <p>{movie.genres.join(', ')}</p>
                        <p>{movie.releaseDate}</p>
                        <p className={styles.rating}>
                            <Image width={20} height={20} src="/star.svg" alt="star" className={styles.star}/>
                            {movie.voteAverage}
                        </p>
                        <p className={styles['movie-info-item']}>{movie.runtime} min</p>
                    </div>
                    <h3 className={styles['overview-title']}>Overview</h3>
                    <p className={styles.overview}>{movie.overview}</p>
                    <MovieButtons/>
                </div>
                <div className={styles.credits}>
                    <h3>Director</h3>
                    <ul className={styles.director}>
                        <li>Director 1</li>
                        <li>Director 2</li>
                    </ul>
                    <h3>Cast</h3>
                    <ul className={styles.cast}>
                        <li>Actor 1</li>
                        <li>Actor 2</li>
                        <li>Actor 3</li>
                        <li>Actor 4</li>
                    </ul>
                </div>
            </div>
        </>
    );
}
