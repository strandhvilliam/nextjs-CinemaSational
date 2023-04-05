'use client';
import { useEffect, useState } from "react";
import styles from "./MovieButtons.module.css";
import { useAuth } from "@/app/AuthProvider";
import toast from "react-hot-toast";
import Loader from "@/app/components/UI/Loader";

interface Props {
    movieId: string,
}

const getIsFavorite = async (movieId: string, userId: string) => {
    const res = await fetch(`/api/favorite?movieId=${movieId}&userId=${userId}`);
    return await res.json();
}

const MovieButtons = ( { movieId }: Props ) => {
    const auth = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);

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
        console.log("watch")
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

    return (
        <div className={styles.container}>
            <button onClick={watchHandler} className={styles.button}>Watch</button>
            {auth.loading ? <Loader /> : <button onClick={addToFavoritesHandler} className={styles.button}>{isFavorite ? 'Add to favorites' : 'Remove from favorites'}</button>}
            <button className={styles.button}>Website</button>
        </div>
    );
};

export default MovieButtons;


