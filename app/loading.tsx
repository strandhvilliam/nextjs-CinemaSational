'use client';
import Loader from "@/components/UI/Loader";
import styles from './Loading.module.css'

export default function Loading() {
    console.log('Loading...')
    return (

        <div className={styles.container}>
            <h1>Loading...</h1>
            <Loader />
        </div>
    );
};

