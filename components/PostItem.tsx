'use client';

import styles from './PostItem.module.css'
import Image from "next/image";
import { useState } from "react";
import Card from "@/components/UI/Card";
import Button from "@/components/UI/Button";
import OptionsButton from "@/components/UI/OptionsButton";

interface Props {
    post: Post
}

const PostItem = ({post}: Props) => {


    return (
        <Card className={styles.post}>
            <Image className={styles.icon} src={post.authorPhotoUrl} width={50} height={50} alt={"poster-profile"}/>
            <div className={styles.content}>
                <h3>{post.title}</h3>
                <div className={styles.info}>
                    <span>{post.authorName}</span> | <span>{post.createdAt}</span> | <span>{post.movieTitle}</span>
                </div>
            </div>
            <div className={styles.controls}>
                <Button className={styles["heart-btn"]}>
                    <Image width={20}
                           height={20}
                           alt={"heart"}
                           src={"/heart.svg"}
                    />
                    {post.heartIds.length}
                </Button>
                <OptionsButton className={styles.options}/>
            </div>
        </Card>
    );
};

export default PostItem;
