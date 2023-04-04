import { arrayRemove, arrayUnion, db } from "@/lib/firebase/firebase-server";

export async function POST(request: Request) {

    const {slug, authorId, userId } = await request.json();

    if (!slug || !authorId || !userId) {
        console.log("No request body")
        return new Response(JSON.stringify({message: "No request body"}), { status: 400 });
    }


    const userRef = db.collection("users").doc(userId);
    const heartRef = userRef
        .collection("hearted")
        .where("slug", "==", slug)
        .where("authorId", "==", authorId)



    const doc = await heartRef.get();

    const batch = db.batch();

    if (doc.empty) {
        const heartDoc = userRef.collection("hearted").doc(slug);
        batch.set(heartDoc, {slug, authorId});
        batch.update(db.collection("users").doc(authorId).collection("posts").doc(slug), {heartIds: arrayUnion(userId)});
        await batch.commit();
    } else {
        const heartDoc = userRef.collection("hearted").doc(slug);
        batch.delete(heartDoc);
        batch.update(db.collection("users").doc(authorId).collection("posts").doc(slug), {heartIds: arrayRemove(userId)});
        await batch.commit();
    }


    // register heard with to hearting user with target userid as doc id and slug as field
    // add one to heartcount on post

    return new Response(JSON.stringify({message: "Hearted Post"}), { status: 200 });
}
