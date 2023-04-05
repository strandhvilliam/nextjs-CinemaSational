import styles from './SearchPage.module.css'
import Grid from "@/app/components/UI/Grid";
import { Movie } from "@/app/lib/interfaces/movie";
import { getMoviesBySearch } from "@/app/lib/tmdb/tmdb";
import MoviePoster from "@/app/components/MoviePoster";

const SearchPage = async ( { params }: any) => {

    // const popularMovies: Movie[] = await getPopularMovies();
    const results: Movie[] = await getMoviesBySearch(params.query);

    return (
        <div className={styles.container}>
            <h1>Search results for &quot;{decodeURIComponent(params.query)}&quot;</h1>
            <Grid>
                {results.map((movie: Movie) => (
                    <MoviePoster key={movie.id} movie={movie}/>
                ))}
            </Grid>
        </div>
    );
};

export default SearchPage;


