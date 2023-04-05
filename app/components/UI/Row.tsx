import styles from './Row.module.css'
import { Movie } from "@/app/lib/interfaces/movie";
import MoviePoster from "@/app/components/MoviePoster";
import { ReactNode } from "react";


interface Props {
    children: ReactNode
}

const Row = ({ children }: Props) => {

    return (
        <ul className={styles.row}>
            {children}
        </ul>
    )
}

export default Row;
