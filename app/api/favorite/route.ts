import { db } from "@/app/lib/firebase/firebase-server";


export async function GET(request: Request) {

        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
        const movieId = searchParams.get("movieId");

        if (!userId || !movieId) return new Response("No userId or movieId provided", {status: 400});

        const userRef = db.collection("users").doc(userId);
        const favoriteRef = userRef.collection("favorites").where("movieId", "==", movieId);
        const favoriteDoc = await favoriteRef.get();

        if (favoriteDoc.empty) return new Response(JSON.stringify({isFavorite: false}), {status: 200});
        else return new Response(JSON.stringify({isFavorite: true}), {status: 200});
}

export async function POST(request: Request) {

    const {userId, movieId} = await request.json();

    if (!userId || !movieId) return new Response("No userId or movieId provided", {status: 400});

    const userRef = db.collection("users").doc(userId);
    const favoriteRef = userRef.collection("favorites").where("movieId", "==", movieId);
    const favoriteDoc = await favoriteRef.get();
    const batch = db.batch();

    if (favoriteDoc.empty) {
        const idDoc = userRef.collection("favorites").doc();
        batch.set(idDoc, {movieId});
    } else {
        batch.delete(favoriteDoc.docs[0].ref);
    }

    const message = favoriteDoc.empty ? "Favorite added" : "Favorite removed";
    const res = await batch.commit();

    if (res) return new Response(JSON.stringify({message: message}), {status: 200});
    else return new Response(JSON.stringify({message: "Favorite not updated"}), {status: 500});

}
