'use client'
import styles from './YoutubeEmbed.module.css'
import { useState } from "react";
import Loader from "@/components/UI/Loader";


interface Props {
    videoId: string,
}

const YoutubeEmbed = ({ videoId }: Props) => {
    const [loaded, setLoaded] = useState(false)

    const onLoadedData = () => {
        setLoaded(true)
    }
    return (
        <li className={styles.container}>
            {!loaded && <div className={styles.load}><Loader/></div>}
            <iframe
                className={styles.embed}
                width="360"
                height="203"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Embeded video"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={onLoadedData}
            />
        </li>
    );
};

export default YoutubeEmbed;
