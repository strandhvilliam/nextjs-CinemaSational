import styles from './UserProfile.module.css'
import Image from "next/image";
import { db } from "@/app/lib/firebase/firebase-server";
import { Movie } from "@/app/lib/interfaces/movie";
import { getMovieById } from "@/app/lib/tmdb/tmdb";
import Row from "@/app/components/UI/Row";
import MoviePoster from "@/app/components/MoviePoster";
import SmallPostItem from "@/app/components/SmallPostItem";

interface UserData {
    photoURL: string,
    displayName: string,
    userId: string
}

const UserProfilePage = async ({params}: any) => {

    const usersRef = db.collection('users');
    const query = usersRef.where('userId', '==', params.userId)
    const userDoc = (await query.get()).docs[0];

    if (!userDoc) {
        return (
            <h1>User not found 404</h1>
        )
    }

    const data = userDoc.data();

    const user: UserData = {
        photoURL: data.photoURL,
        displayName: data.displayName,
        userId: data.userId,
    }

    const postsQuery = usersRef.doc(user.userId).collection('posts').orderBy('createdAt', 'desc');
    const posts: Post[] = (await postsQuery.get()).docs.map((doc) => {
        const data = doc.data()
        return {
            ...data as Post,
            createdAt: data.createdAt.toMillis(),
            updatedAt: data.updatedAt.toMillis(),
        }
    });


    const initializeFavorites = async () => {
        const favData = await usersRef.doc(user.userId).collection('favorites').get();
        const favoriteMovies: string[] = []
        favData.forEach((doc) => {
            const data = doc.data()
            favoriteMovies.push(data.movieId)
        })
        return favoriteMovies
    }


    const favoriteMovies: string[] = await initializeFavorites();



    const movies: Movie[] = await Promise.all(favoriteMovies.map(async (id: string) => {
        return await getMovieById(id)
    }));


    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <Image className={styles.image} src={user.photoURL} width={300} height={300} alt={'profile image'}/>
                <div className={styles['user-data']}>
                    <h1 className={styles.name}>{user.displayName}</h1>
                    <div className={styles['user-data-items']}>
                        <span>Posts 3</span>
                        <span>Hearts 4</span>
                    </div>
                </div>
            </div>
            <div className={styles.posts}>
                <h2>Posts</h2>
                <ul className={styles.feed}>
                    {posts.map((post: Post) => (
                        <SmallPostItem post={post} key={post.slug} showIcon={false}/>
                    ))}
                </ul>

            </div>
            <div className={styles.favorites}>
                <h2>Favorites</h2>
                <Row>
                    {movies.map((movie: Movie) => (
                        <MoviePoster movie={movie} key={movie.id}/>
                    ))}
                </Row>
            </div>

        </div>
    );
};

export default UserProfilePage;
