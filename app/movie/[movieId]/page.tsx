import styles from "./MoviePage.module.css";
import { Movie } from "@/lib/interfaces/movie";
import Image from "next/image";
import { getMovieById, getMovieCredits, getMovieVideos } from "@/lib/tmdb/tmdb";
import MovieButtons from "@/components/MovieButtons";
import DownButton from "@/components/UI/DownButton";
import PostFeed from "@/components/PostFeed";
import VideoScroller from "@/components/VideoScroller";
import { Video } from "@/lib/interfaces/video";
import { Credit } from "@/lib/interfaces/credit";
import MovieCast from "@/components/MovieCast";
import ViewPost from "@/components/ViewPost";

const IMG_URL: string = "https://image.tmdb.org/t/p/original";

const MoviePage = async ({params}: any) => {

    const movie: Movie = await getMovieById(params.movieId);
    const videos: Video[] = await getMovieVideos(params.movieId);
    const videoURLs: string[] = videos
        .filter((video: Video) => video.site === "YouTube")
        .filter((video: Video) => video.type === "Trailer" || video.type === "Teaser")
        .map((video: Video) => video.key);

    const {cast, crew} = await getMovieCredits(params.movieId);
    const directors: Credit[] = crew.filter((credit: Credit) => credit.role === "Director").slice(0, 3);
    const actors: Credit[] = cast.slice(0, 6);
    const finalCast = directors.concat(actors);

    return (
        <>
            <div className={styles.container}>
                <MovieView movie={movie} videoURLs={videoURLs} cast={finalCast}/>
                <DownButton className={styles['down-button']}/>
                <div className={styles.transition}></div>
            </div>
            <div className={styles['post-feed-container']}>
                <ul className={styles.posts}>
                    <ViewPost/>
                    <ViewPost/>
                    <ViewPost/>
                    <ViewPost/>
                    <ViewPost/>
                    <ViewPost/>
                    <ViewPost/>
                    <ViewPost/>
                </ul>

            </div>
        </>
    );

};

export default MoviePage;


interface ViewProps {
    movie: Movie,
    videoURLs: string[],
    cast: Credit[],
}


const MovieView = ({movie, videoURLs, cast}: ViewProps) => {
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
                <VideoScroller videosURL={videoURLs}/>
            </div>
            <h3 className={styles['cast-title']}>Cast & Crew</h3>
            <MovieCast className={styles.cast} cast={cast}/>
        </>
    );
}




