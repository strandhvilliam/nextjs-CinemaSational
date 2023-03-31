import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { db } from "@/lib/firebase/firebase-server";
import Link from "next/link";
import MoviePoster from "@/components/MoviePoster";

const inter = Inter({subsets: ['latin']})
import { getMovieById } from "@/lib/tmdb/tmdb";
import MovieRow from "@/components/MovieRow";

export default async function Home() {



    return (
        <main>
            <div className={styles.container}>
                <MovieRow>
                    <MoviePoster/>
                    <MoviePoster/>
                    <MoviePoster/>
                    <MoviePoster/>
                    <MoviePoster/>
                    <MoviePoster/>
                    <MoviePoster/>
                </MovieRow>
            </div>
        </main>

    )
}


