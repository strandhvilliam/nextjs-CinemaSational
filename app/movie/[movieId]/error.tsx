'use client';

import styles from '../../error.module.css'

import Link from "next/link";
import Card from "@/app/components/UI/Card";

export default function MovieError() {
    return (
        <Card className={styles.container}>
                <h1 className={styles.error}>404</h1>
                <h2 className={styles.message}>Requested movie not found</h2>
                <p className={styles.info}>Check out <Link className={styles.link} href={"https://www.themoviedb.org/"}>themoviedb.org</Link> for more information</p>
        </Card>

    )
}
