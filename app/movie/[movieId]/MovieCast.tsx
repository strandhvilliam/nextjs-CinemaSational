import styles from './MovieCast.module.css'
import Image from "next/image";
import { Credit } from "@/app/lib/interfaces/credit";

interface Props {
    cast: Credit[],
    className?: string,
}

const IMG_URL: string = "https://image.tmdb.org/t/p/original";

const MovieCast = ({cast, className }: Props) => {


    return (
        <div className={`${styles.container} ${className ? className : ''}`}>
            <ul className={styles.row}>
                {cast.map((credit: Credit) => (
                    <li key={credit.id}>
                        <Image className={styles['profile-image']} src={`${credit.profilePath ? IMG_URL.concat(credit.profilePath) : '/placeholder-user.png'}`} alt={credit.name} width={240} height={240}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieCast;
