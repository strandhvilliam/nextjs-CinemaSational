import styles from './SearchPage.module.css'
import MovieRow from "@/components/MovieRow";
import MovieGrid from "@/components/MovieGrid";
import { Movie } from "@/lib/interfaces/movie";
import { getMoviesBySearch, getPopularMovies } from "@/lib/tmdb/tmdb";

const SearchPage = async ( { params }: any) => {

    // const popularMovies: Movie[] = await getPopularMovies();
    const results: Movie[] = await getMoviesBySearch(params.query);



    return (
        <div className={styles.container}>
            <h1>Search results for &quot;{decodeURIComponent(params.query)}&quot;</h1>
            <MovieGrid content={results}/>
        </div>
    );
};

export default SearchPage;
