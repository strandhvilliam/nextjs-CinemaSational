import styles from './VideoScroller.module.css'
import YoutubeEmbed from "@/app/movie/[movieId]/YoutubeEmbed";


interface Props {
    videosURL: string[]
}

const VideoScroller = ( { videosURL }: Props ) => {
    return (
        <>
        {videosURL.length > 2 && <div className={styles['container-overlay']}/>}
            <ul className={styles['scroll-container']}>
                {videosURL.map((url: string) => (
                    <YoutubeEmbed key={url} videoId={url}/>
                ))}
            </ul>
        </>

    );
};

export default VideoScroller;
