import styles from './UserProfile.module.css'
import Image from "next/image";
import PostFeed from "@/app/components/PostFeed";
import { db } from "@/app/lib/firebase/firebase-server";

interface UserData {
    photoURL: string,
    displayName: string,
    userId: string
}

const UserProfilePage = async ({ params }: any) => {

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

    console.log(user)


    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.user}>
                    <Image className={styles['profile-image']} src={user.photoURL} alt={"profile-pic"} width={40} height={40}></Image>
                    <h1>Firstname Lastname</h1>
                    <div className={styles['user-data']}>
                        <span>Posts: 2</span>
                        <span>Hearts: 4</span>
                    </div>
                </div>
                <div className={styles.favorites}>
                    <h3>User has no favorites</h3>
                </div>
            </div>
            <PostFeed />
        </div>
    );
};

export default UserProfilePage;
