import styles from "./MoviePage.module.css";
import { Movie } from "@/lib/interfaces/movie";
import Image from "next/image";
import { getMovieById, getMovieCredits, getMovieVideos } from "@/lib/tmdb/tmdb";
import MovieButtons from "@/components/MovieButtons";
import DownButton from "@/components/UI/DownButton";
import PostFeed from "@/components/PostFeed";
import VideoScroller from "@/components/VideoScroller";
import { Video } from "@/lib/interfaces/video";
import { Cast } from "@/lib/interfaces/cast";
import MovieCast from "@/components/MovieCast";

const IMG_URL: string = "https://image.tmdb.org/t/p/original";

const MoviePage = async ({params}: any) => {

    const movie: Movie = await getMovieById(params.movieId);
    const videos: Video[] = await getMovieVideos(params.movieId);
    const videoURLs: string[] = videos
        .filter((video: Video) => video.site === "YouTube")
        .filter((video: Video) => video.type === "Trailer" || video.type === "Teaser")
        .map((video: Video) => video.key);
    const credits: Cast[] = await getMovieCredits(params.movieId);

    const directors: Cast[] = credits.filter((credit: Cast) => credit.role === "Director").slice(0, 3);
    console.log(credits.filter((credit: Cast) => credit.role === "Director")[0])

    const actors: Cast[] = credits.slice(0, 5);

    return (
        <>
            <div className={styles.container}>
                <MovieView movie={movie} videoURLs={videoURLs} directors={directors} actors={actors}/>
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


interface ViewProps {
    movie: Movie,
    videoURLs: string[],
    directors: Cast[],
    actors: Cast[]
}


const MovieView = ({movie, videoURLs, directors, actors }: ViewProps) => {
    const background = `url(${(IMG_URL.concat(movie.backdropPath))})`

    const optimizeTitle = (title: string) => {
        if (title.includes(":")) {
            return <h1 className={styles.title}>{title.split(":")[0]}:<br/>{title.split(":")[1]}</h1>
        }
        return <h1 className={styles.title}>{title}</h1>
    }

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
                <MovieCast directors={directors} actors={actors}/>
                <VideoScroller videosURL={videoURLs}/>
            </div>
        </>
    );
}
