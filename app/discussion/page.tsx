import styles from './Discussion.module.css'
import PostItem from "@/components/PostItem";
import { db } from "@/lib/firebase/firebase-server";
import AuthCheck from "@/app/AuthCheck";
import Logo from "@/components/UI/Logo";

const DiscussionPage = async () => {

    const query = db.collectionGroup('posts')

    const posts: Post[] = (await query.get()).docs.map((doc) => {
            const data = doc.data()
            return {
                id: doc.id,
                title: data.title,
                content: data.content,
                published: data.published,
                createdAt: data.createdAt.toMillis(),
                updatedAt: data.updatedAt.toMillis(),
                authorId: data.authorId,
                authorName: data.authorName,
                authorPhotoUrl: data.authorPhotoUrl,
                movieId: data.movieId,
                movieTitle: data.movieTitle,
                heartCount: data.heartCount,
            }
        }
    )

    const content = posts.map((post: Post) => (
        <PostItem key={post.id} post={post}/>))


    return (
            <div className={styles.container}>
                <h1>Discussion</h1>
                <ul className={styles.list}>
                    {content}
                </ul>

                <Logo size={"1"}/>

            </div>
    );
};

export default DiscussionPage;
