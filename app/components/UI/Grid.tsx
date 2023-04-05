import styles from './Grid.module.css'
import { Movie } from "@/app/lib/interfaces/movie";
import MoviePoster from "@/app/components/MoviePoster";
import { getPopularMovies } from "@/app/lib/tmdb/tmdb";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

const Grid = ({children}: Props) => {


    return (
        <ul className={styles.grid}>
            {children}
        </ul>
    );
};

export default Grid;
