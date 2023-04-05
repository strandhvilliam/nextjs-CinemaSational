import { getMovieById } from "@/app/lib/tmdb/tmdb";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log(id);
    if (!id) return new Response("No id provided", { status: 400 });
    const data = await getMovieById(id);
    return new Response(JSON.stringify(data));
}
