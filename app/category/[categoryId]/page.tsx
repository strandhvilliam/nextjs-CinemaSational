import { Movie } from "@/lib/interfaces/movie";
import { getMoviesByGenre, getMoviesBySearch } from "@/lib/tmdb/tmdb";
import styles from "./CategoryPage.module.css";
import MovieGrid from "@/components/MovieGrid";

const CategoryPage = async ({params}: any) => {

    const movies: Movie[] = await getMoviesByGenre(params.categoryId);


    return (
        <>
            <div className={styles.container}>
                <h1>Category &quot;{decodeURIComponent(params.name)}&quot;</h1>
                <MovieGrid content={movies}/>
            </div>
        </>

    );
};

export default CategoryPage;

