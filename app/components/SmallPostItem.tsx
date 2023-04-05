'use client';

import styles from './SmallPostItem.module.css'
import Image from "next/image";
import { useState } from "react";
import Card from "@/app/components/UI/Card";
import Button from "@/app/components/UI/Button";
import OptionsButton from "@/app/components/UI/OptionsButton";
import Link from "next/link";

interface Props {
    post: Post,
    showIcon?: boolean
}

const SmallPostItem = ({post, showIcon = true}: Props) => {


    return (
        <Link href={`/user/${post.authorId}/${post.slug}`}>
            <Card className={styles.post}>
                {showIcon && <Image className={styles.icon} src={post.authorPhotoUrl} width={50} height={50}
                                    alt={"poster-profile"}/>}
                <div className={styles.content}>
                    <h3>{post.title}</h3>
                    <div className={styles.info}>
                        <span>{post.authorName}</span> | <span>{new Date(post.createdAt).toISOString().slice(0, 10)}</span> | <span>{post.movieTitle}</span>
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
        </Link>
    );
};

export default SmallPostItem;
