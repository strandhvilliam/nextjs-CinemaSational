import { db, serverTimestamp } from "@/app/lib/firebase/firebase-server";

export async function POST(request: Request) {

    const req: Post = await request.json();


    const usersRef = db.collection("users").doc(req.authorId);
    const postRef = usersRef.collection("posts").doc(req.slug);

    const post = await postRef.get();
    if (post.exists) return new Response(JSON.stringify({message: "Post already exists"}), { status: 400 });

    const data = {
        ...req,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    }

    const res = await postRef.set(data);

    if (res) return new Response(JSON.stringify({message: "Post created"}), { status: 200 });
    else return new Response(JSON.stringify({message: "Post not created"}), { status: 500 });
}
