import styles from './MovieCast.module.css'
import Image from "next/image";
import { Cast } from "@/lib/interfaces/cast";

interface Props {
    directors: Cast[],
    actors: Cast[]
}

const MovieCast = ({directors, actors}: Props) => {


    return (
        <div className={styles.container}>
            <h3>Directors</h3>
            <ul className={styles.row}>
                {directors.map((director: Cast) => (
                    <li key={director.id}>
                        <Image src={director.profilePath} alt={director.name} width={40} height={40}/>
                    </li>
                ))}
            </ul>
            <h3>Cast</h3>
            <ul className={styles.row}>
                {actors.map((actor: Cast) => (
                    <li key={actor.id}>
                        <Image className={styles['profile-image']} src={actor.profilePath} alt={actor.name} width={40} height={40}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieCast;
