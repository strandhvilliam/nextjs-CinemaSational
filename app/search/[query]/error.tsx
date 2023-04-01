'use client';
import styles from "@/app/error.module.css";
import Link from "next/link";
import Card from "@/components/UI/Card";

const SearchError = () => {
    return (
        <Card className={styles.container}>
            <h1 className={styles.error}>404</h1>
            <h2 className={styles.message}>There were no results</h2>
            <p className={styles.info}>Check out <Link className={styles.link} href={"https://www.themoviedb.org/"}>themoviedb.org</Link> for more information</p>
        </Card>
    );
};

export default SearchError;
