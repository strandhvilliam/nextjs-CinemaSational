import { Inter } from 'next/font/google'
import styles from './page.module.css'
import MoviePoster from "@/app/components/MoviePoster";

const inter = Inter({subsets: ['latin']})
import {
    getPopularMovies,
    getTopRatedMovies,
    getTrendingMovies,
    getUpcomingMovies
} from "@/app/lib/tmdb/tmdb";
import Row from "@/app/components/UI/Row";
import { Movie } from "@/app/lib/interfaces/movie";

export default async function Home() {

    const popularMovies: Movie[] = await getPopularMovies();
    const upcomingMovies: Movie[] = await getUpcomingMovies();
    const topRatedMovies: Movie[] = await getTopRatedMovies();
    const trendingMovies: Movie[] = await getTrendingMovies();


    return (
        <main>
            <div className={styles.container}>
                <div className={styles.group}>
                    <h2>Trending</h2>
                    <Row>
                        {trendingMovies.map((movie: Movie) => (
                            <MoviePoster key={movie.id} movie={movie}/>
                        ))}
                    </Row>
                </div>
                <div className={styles.group}>
                    <h2>Popular</h2>
                    <Row>
                        {popularMovies.map((movie: Movie) => (
                        <MoviePoster key={movie.id} movie={movie}/>
                    ))}
                    </Row>
                </div>
                <div className={styles.group}>
                    <h2>Upcoming</h2>
                    <Row>
                        {upcomingMovies.map((movie: Movie) => (
                        <MoviePoster key={movie.id} movie={movie}/>
                    ))}
                    </Row>
                </div>
                <div className={styles.group}>
                    <h2>Top Rated</h2>
                    <Row>
                        {topRatedMovies.map((movie: Movie) => (
                        <MoviePoster key={movie.id} movie={movie}/>
                    ))}
                    </Row>
                </div>
            </div>
        </main>

    )
}


