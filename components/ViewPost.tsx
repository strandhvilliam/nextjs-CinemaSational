import styles from "./ViewPost.module.css";
import Card from "@/components/UI/Card";
import Image from "next/image";
import Button from "@/components/UI/Button";
import Link from "next/link";

const ViewPost = () => {
    return (
        <li>
            <Card className={styles.post}>
                <div className={styles.top}>
                    <Image className={styles.image} src={'/img.png'} alt={"profile image"} width={60} height={60}/>
                    <div className={styles.info}>
                        <span>Leia Organa | 2023-01-1</span>
                        <span>Star wars: Rise of the Skywalker</span>
                    </div>
                </div>
                <div className={styles.content}>
                    <h2>This is a header</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloremque fuga fugiat ipsa numquam
                        placeat qui quibusdam repudiandae? Aut harum impedit optio placeat vitae. Accusantium blanditiis cum
                        cumque doloremque est illo, ipsa ipsum, magni molestiae necessitatibus nemo, nisi placeat quaerat
                        quidem sit temporibus tenetur voluptatibus! Accusamus ad adipisci aspernatur culpa cum dolorem ea
                        eligendi id illum iste provident quaerat velit veniam, veritatis vero. Adipisci corporis deserunt
                        distinctio dolores doloribus ea earum error facere facilis in magni minus nihil, omnis pariatur
                        praesentium quasi quibusdam reiciendis rem reprehenderit sed sint tenetur totam ullam unde ut
                        voluptate voluptatibus. Placeat quia tenetur totam ullam.
                    </p>
                </div>
                <div className={styles.bottom}>
                    <Link className={styles.link} href={'/'}>Read full post</Link>
                </div>
            </Card>
        </li>

);
};

export default ViewPost;
