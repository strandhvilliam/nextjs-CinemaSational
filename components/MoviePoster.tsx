import styles from './MoviePoster.module.css'
import Image from "next/image";


const MoviePoster = () => {
    return (
        <li className={styles.poster}>
            <Image className={styles.image} src={"/img.png"} alt={"img"} width={200} height={300}/>
            <div className={styles.content}>
                <h3>Interstellar</h3>
                <p>2023</p>
            </div>

        </li>
    );
};

export default MoviePoster;
