import styles from './UserPost.module.css'
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { db, getPostsByMovieId } from "@/lib/firebase/firebase-server";
import UserPostButtons from "@/app/user/[userId]/[slug]/UserPostButtons";
import Link from "next/link";
import MoviePoster from "@/components/MoviePoster";
import { getMovieById } from "@/lib/tmdb/tmdb";
import { Movie } from "@/lib/interfaces/movie";

const IMG_URL: string = "https://image.tmdb.org/t/p/original";

const UserPost = async ({params}: any) => {

    const {userId, slug} = params;

    const snapshot = await db.collection('users').doc(userId).collection('posts').doc(slug).get();
    if (!snapshot.exists) {
        return <h1>Post not found</h1>
    }
    const post: Post = {
        ...snapshot.data() as Post,
        createdAt: snapshot.data()!.createdAt.toMillis(),
        updatedAt: snapshot.data()!.updatedAt.toMillis(),
    };

    const movie: Movie = await getMovieById(post.movieId);

    const formattedDate = new Date(post.createdAt).toISOString().slice(0, 10);

    const posts: Post[] = await getPostsByMovieId(post.movieId);

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <h1>{post.title}</h1>
                <ReactMarkdown>
                    {post.content}
                </ReactMarkdown>
            </div>
            <div className={styles.side}>
                <div className={styles.profile}>
                    <Image className={styles['user-image']} src={`${post.authorPhotoUrl ? post.authorPhotoUrl : '/placeholder-user.png'}`} alt="profile image" width={100} height={100}/>
                    <div className={styles.info}>
                        <Link href={`/user/${post.authorId}`}><strong>{post.authorName}</strong></Link>
                        <span>Published: {formattedDate}</span>
                        <span>{post.movieTitle}</span>
                    </div>
                    <div className={styles.actions}>
                        <UserPostButtons post={post}/>
                    </div>
                </div>
                <MoviePoster movie={movie} />
                <h3>Other posts about {post.movieTitle}</h3>
                <ul className={styles['other-list']}>
                    {posts.slice(0, 5).map((post: Post) => (
                        <li className={styles['other-item']} key={post.slug}>
                            <Link href={`/user/${post.authorId}/${post.slug}`}>
                                {post.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>);
};
export default UserPost;


