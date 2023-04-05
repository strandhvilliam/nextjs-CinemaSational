'use client';

import styles from './CreatePage.module.css'
import Button from "@/app/components/UI/Button";
import CloseButton from "@/app/components/UI/CloseButton";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Movie } from "@/app/lib/interfaces/movie";
import { useAuth } from "@/app/AuthProvider";
import Loader from "@/app/components/UI/Loader";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CreatePage = ({params}: any) => {

    const auth = useAuth();

    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [toastIsActive, setToastIsActive] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        const initMovie = async (movieId: string) => {
            console.log(movieId)
            const res = await fetch(`http://localhost:3000/api/movie?id=${movieId}`);
            const data: Movie = await res.json();
            setMovie(data);
            setLoading(false);
        }
        initMovie(params.movieId)

    }, [params.movieId]);

    const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        const slug = encodeURIComponent(e.target.value.toLowerCase().trim()
            .replace(/ /g, '-')
            .replace(/[^\w-0-9]+/g, ''));
        setSlug(slug);
    }


    const closeHandler = () => {
        console.log('close');
        // remove post from firestore
        // redirect to movie page
    }

    const createPost = async (e: FormEvent) => {
        e.preventDefault();

        const post: Post = {
            slug: slug,
            title: title,
            content: content,
            movieId: movie!.id,
            movieTitle: movie!.title,
            authorId: auth.user!.uid,
            authorName: auth.user!.displayName!,
            authorPhotoUrl: auth.user!.photoURL!,
            published: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            heartIds: [],
        }

        const res = await fetch('http://localhost:3000/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });

        const { message } = await res.json();

        if (res.status === 200) {
            toast.success(message, {id: 'post-created-toast'});
            redirect(`http://localhost:3000/post/${slug}`);
        } else if (res.status === 400) {
            toast.error(`${res.status} -- ${message}`, {id: 'post-created-toast'});

        } else {
            toast.error(`${res.status} -- ${message? message : 'Something went wrong'}`, {id: 'post-created-toast'});
        }

    }

    if (loading) {
        return <Loader />
    }
    if (!auth.user) {
        if (auth.loading) {
            return <Loader />
        } else {
            if (!toastIsActive) {
                toast.error('You need to be logged in to create a post.', {id: 'login-toast'})
            }
            setToastIsActive(true);

            redirect('/login');
        }
    }

    return (
        !movie
            ?
            <h1>No movie</h1>
            :
            <>
                <h1 className={styles['section-title']}>Create new post</h1>
                <div className={styles.container}>
                    <CloseButton
                        onClick={closeHandler}
                        className={styles['close-button']}/>
                    <form
                        onSubmit={createPost}
                        className={styles.form}>
                        <div
                            className={styles['form-group']}>
                            <input
                                value={title}
                                className={styles['title-input']}
                                id="title"
                                onChange={titleChangeHandler}
                                type="text"
                                placeholder="Title"/>
                            <textarea
                                className={styles['content-input']}
                                id="content"
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Content"
                                rows={10}/>
                        </div>
                        <div className={styles['form-group']}>
                            <p className={styles.label}>Markdown Tips</p>
                            <ul className={styles.list}>
                                <li className={styles.item}><strong>#</strong> Heading 1</li>
                                <li className={styles.item}><strong>##</strong> Heading 2</li>
                                <li className={styles.item}><strong>###</strong> Heading 3</li>
                                <li className={styles.item}><strong>**</strong>Bold<strong>**</strong></li>
                                <li className={styles.item}><strong>*</strong>Italic<strong>*</strong></li>
                                <li className={styles.item}><strong>~~</strong>Strikethrough<strong>~~</strong></li>
                            </ul>

                            <p className={styles.label}>Author</p>
                            <span className={styles.field}>{auth.user?.displayName}</span>
                            <p className={styles.label}>Movie</p>
                            <span className={styles.field}>{movie.title}</span>
                            <p className={styles.label}>Link</p>
                            <span className={styles.field}>{`https://localhost:3000/user/${slug}`}</span>
                            <div className={styles.buttons}>
                                <Button className={styles['preview-button']}>Preview</Button>
                                <Button submit={true} className={styles['submit-button']}>Submit</Button>
                            </div>

                        </div>

                    </form>
                </div>
            </>
    );
};

export default CreatePage;
