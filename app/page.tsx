import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { db } from "@/lib/firebase/firebase-server";
import Link from "next/link";

const inter = Inter({subsets: ['latin']})
import { getMovieById } from "@/lib/tmdb/tmdb";

export default async function Home() {



    return (
        <main>

        </main>

    )
}
