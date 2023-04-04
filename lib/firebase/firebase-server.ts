import admin from "firebase-admin";

import serviceAccount from "../serviceAccount.json"

if (!admin.apps.length) {
    console.log("Firebase admin initialized")
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as any),
    })
}

export const db = admin.firestore()

export const getPostsByMovieId = async (movieId: string) => {
    try {
        const query = db.collectionGroup("posts").where("movieId", "==", +movieId).orderBy("createdAt", "desc");
        const snapshot = await query.get();
        const data = snapshot.docs.map((doc) => doc.data());
        console.log("data: " + data)

        const posts: Post[] = data.map((post) => {
            return {
                slug: post.slug,
                title: post.title,
                content: post.content,
                authorId: post.authorId,
                authorName: post.authorName,
                authorPhotoUrl: post.authorPhotoUrl,
                heartIds: post.heartIds,
                movieId: post.movieId,
                movieTitle: post.movieTitle,
                published: post.published,
                createdAt: post.createdAt.toMillis(),
                updatedAt: post.updatedAt.toMillis(),
            }
        });
        return posts;
    } catch (error) {
        console.log("error! " + error);
        return [];
    }

}

export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp;
export const arrayUnion = admin.firestore.FieldValue.arrayUnion;
export const arrayRemove = admin.firestore.FieldValue.arrayRemove;
