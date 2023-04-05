import styles from './Discussion.module.css'
import SmallPostItem from "@/app/components/SmallPostItem";
import { db } from "@/app/lib/firebase/firebase-server";
import Logo from "@/app/components/UI/Logo";

const DiscussionPage = async () => {

    const query = db.collectionGroup('posts')

    const posts: Post[] = (await query.get()).docs.map((doc) => {
            const data = doc.data()
            return {
                slug: data.slug,
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
                heartIds: data.heartIds,
            }
        }
    )

    const content = posts.map((post: Post) => <li key={post.slug}><SmallPostItem post={post}/></li>)


    return (
            <div className={styles.container}>
                <h1>Discussion</h1>
                <ul className={styles.list}>
                    {content}
                </ul>
            </div>
    );
};

export default DiscussionPage;
