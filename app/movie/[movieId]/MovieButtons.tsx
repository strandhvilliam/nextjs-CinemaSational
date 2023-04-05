'use client';
import { useEffect, useRef, useState } from "react";
import styles from "./MovieButtons.module.css";
import { useAuth } from "@/app/AuthProvider";
import toast from "react-hot-toast";
import Loader from "@/app/components/UI/Loader";
import { Provider } from "@/app/lib/interfaces/provider";
import Image from "next/image";
import Link from "next/link";

interface Props {
    movieId: string,
    movieTitle: string,
    providers: Provider[]
}

const IMG_URL: string = "https://image.tmdb.org/t/p/original";

const getIsFavorite = async (movieId: string, userId: string) => {
    const res = await fetch(`/api/favorite?movieId=${movieId}&userId=${userId}`);
    return await res.json();
}

const MovieButtons = ( { movieId, providers, movieTitle }: Props ) => {
    const auth = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);
    const providerRef = useRef<HTMLUListElement | null>(null)

    useEffect(() => {

        const checkIsFavorite = async () => {
            if (auth.user) {
                const res = await getIsFavorite(movieId, auth.user.uid);
                setIsFavorite(res.isFavorite);
            }
        }
           checkIsFavorite()

    }, [auth.user, movieId]);


    const watchHandler = () => {
        providerRef.current?.classList.toggle(styles['open']);
    }


    const addToFavoritesHandler = async () => {

        if (!auth.user) {
            toast.error("You need to be logged in to add a movie to your favorites");
            return;
        }

        const userId = auth.user.uid;

        const res = await fetch(`/api/favorite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                movieId,
                userId
            })
        });

        const data = await res.json();

        if (res.status === 200) {
            toast.success(data.message);
            setIsFavorite(!isFavorite);
        } else {
            toast.error(data.message);
        }
    }

    const websiteHandler = () => {
        console.log("website")
    }

    const providerList = providers.map((provider: Provider) => (
        <li key={provider.id} className={styles['provider-item']}>
            <Link href={`https://www.google.com/search?q=${encodeURIComponent(`${provider.name} ${movieTitle}`)}`}><Image className={styles['provider-image']} width={50} height={50} src={IMG_URL.concat(provider.logoPath)} alt={provider.name}/></Link>
        </li>
    ))

    return (
        <div className={styles.container}>
            <button onClick={watchHandler} className={styles.button}>Watch</button>
            <ul ref={providerRef} className={styles['provider-list']}>
                {providerList.length > 0 ? providerList : <li className={styles['provider-item']}>No providers found</li>}
                <small className={styles['provider-note']}>*Provided by JustWatch</small>
            </ul>
            {auth.loading ? <Loader /> : <button onClick={addToFavoritesHandler} className={styles.button}>{!isFavorite ? 'Add to favorites' : 'Remove from favorites'}</button>}
            <button className={styles.button}>Website</button>
        </div>
    );
};

export default MovieButtons;


