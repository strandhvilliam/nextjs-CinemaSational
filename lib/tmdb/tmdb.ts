import { Movie } from "@/lib/interfaces/movie";
import { notFound } from "next/navigation";

export const getMovieById = async (id: string) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
        {
            cache: "force-cache",
            next: {revalidate: 60 * 60 * 24}
        }
    );
    const data = await res.json();

    if (data.success === false) {
        console.log(data.status_message)
        notFound();
    }

    const movie: Movie = {
        id: data.id,
        title: data.title,
        releaseDate: data.release_date,
        posterPath: data.poster_path,
        overview: data.overview,
        voteAverage: data.vote_average.toFixed(1),
        genres: data.genres.map((genre: { name: string; }) => genre.name),
        runtime: data.runtime,
        backdropPath: data.backdrop_path,
        status: data.status
    }

    return movie;
}


