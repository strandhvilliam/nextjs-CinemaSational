import styles from './VideoScroller.module.css'
import YoutubeEmbed from "@/components/YoutubeEmbed";


interface Props {
    videosURL: string[]
}

const VideoScroller = ( { videosURL }: Props ) => {
    return (
        <>
            <div className={styles['container-overlay']}/>
            <ul className={styles['scroll-container']}>
                {videosURL.map((url: string) => (
                    <YoutubeEmbed key={url} videoId={url}/>
                ))}
            </ul>
        </>

    );
};

export default VideoScroller;
