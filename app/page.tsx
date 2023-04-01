import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { db } from "@/lib/firebase/firebase-server";
import Link from "next/link";
import MoviePoster from "@/components/MoviePoster";

const inter = Inter({subsets: ['latin']})
import {
    getMovieById,
    getPopularMovies,
    getTopRatedMovies,
    getTrendingMovies,
    getUpcomingMovies
} from "@/lib/tmdb/tmdb";
import MovieRow from "@/components/MovieRow";
import { Movie } from "@/lib/interfaces/movie";

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
                    <MovieRow content={trendingMovies}/>
                </div>
                <div className={styles.group}>
                    <h2>Popular</h2>
                    <MovieRow content={popularMovies}/>
                </div>
                <div className={styles.group}>
                    <h2>Upcoming</h2>
                    <MovieRow content={upcomingMovies}/>
                </div>
                <div className={styles.group}>
                    <h2>Top Rated</h2>
                    <MovieRow content={topRatedMovies}/>
                </div>


            </div>
        </main>

    )
}


