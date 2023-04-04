'use client';
import { useAuth } from "@/app/AuthProvider";
import { HeartReqData } from "@/lib/interfaces/heartReqData";
import styles from "./UserPost.module.css";
import Button from "@/components/UI/Button";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Loader from "@/components/UI/Loader";


const UserPostButtons = ( { post }: { post: Post}) => {
    const auth = useAuth();
    const [hearted, setHearted] = useState<boolean>(false);
    const [hearts, setHearts] = useState<number>(+post.heartIds.length);

    useEffect(() => {
        if(auth.user) {
            setHearted(post.heartIds.includes(auth.user!.uid));
        }
    }, [auth.user, post.heartIds]);

    const updateHearts = async () => {

        if(!auth.user) {
            toast('You must be logged in to heart a post' );
            return;
        }

        const heartReqData: HeartReqData = {
            slug: post.slug,
            userId: auth.user!.uid,
            authorId: post.authorId,
        }



        const res: Response = await fetch(`/api/heart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(heartReqData)
        });
        const data = await res.json();

        if (res.status !== 200) {
            toast.error(data.message);
        } else {
            toast.success(data.message);
            setHearted(!hearted);
            hearted && setHearts((prev) => prev - 1);
            !hearted && setHearts((prev) => prev + 1);
        }
    }

    return (
        <div className={styles.buttons}>
            {auth.loading ? <Loader /> : !hearted ? <Button onClick={updateHearts} className={styles.button}>{hearts} Heart</Button>
            : <Button onClick={updateHearts} className={styles.button}>{hearts} Unheart</Button>}
        </div>
    );
}


export default UserPostButtons;
