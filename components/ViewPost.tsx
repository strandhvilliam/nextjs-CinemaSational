import styles from "./ViewPost.module.css";
import Card from "@/components/UI/Card";
import Image from "next/image";
import Button from "@/components/UI/Button";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const ViewPost = ( { post }: {post: Post} ) => {

    const createdAt = new Date(post.createdAt).toISOString().slice(0, 10);
    return (
        <li>
            <Card className={styles.post}>
                <div className={styles.top}>
                    <Image className={styles.image} src={`${post.authorPhotoUrl ? post.authorPhotoUrl : '/placeholder-user.png'}`} alt={"profile image"} width={60} height={60}/>
                    <div className={styles.info}>
                        <div>
                            <Link href={`user/${post.authorId}`}><span className={styles.name}>{post.authorName}</span></Link>
                            <span>{` | ${createdAt}`}</span>
                        </div>

                        <span>{post.movieTitle}</span>
                    </div>
                </div>
                <div className={styles.content}>
                    <h2>{post.title}</h2>
                    <ReactMarkdown>
                        {post.content}
                    </ReactMarkdown>
                </div>
                <div className={styles.bottom}>
                    <Link className={styles.link} href={`post/${post.authorId}/${post.slug}`}>Read full post</Link>
                </div>
            </Card>
        </li>

);
};

export default ViewPost;
