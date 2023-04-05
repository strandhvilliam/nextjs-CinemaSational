import { Movie } from "@/app/lib/interfaces/movie";
import { getMoviesByGenre, getMoviesBySearch } from "@/app/lib/tmdb/tmdb";
import styles from "./CategoryPage.module.css";
import Grid from "@/app/components/UI/Grid";
import MoviePoster from "@/app/components/MoviePoster";

const CategoryPage = async ({params}: any) => {

    const movies: Movie[] = await getMoviesByGenre(params.categoryId);


    return (
        <>
            <div className={styles.container}>
                <h1>Category &quot;{decodeURIComponent(params.name)}&quot;</h1>
                <Grid>
                    {movies.map((movie: Movie) => (
                        <MoviePoster key={movie.id} movie={movie}/>
                    ))}
                </Grid>
            </div>
        </>

    );
};

export default CategoryPage;

