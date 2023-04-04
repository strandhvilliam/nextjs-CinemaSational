import { Movie } from "@/lib/interfaces/movie";
import { notFound } from "next/navigation";
import { Video } from "@/lib/interfaces/video";
import { Credit } from "@/lib/interfaces/credit";
import { Category } from "@/lib/interfaces/category";

export const getMovieById = async (id: string) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
        {
            cache: "force-cache",
            next: {revalidate: 60 * 60 * 24}
        }
    );
    const data = await res.json();

    if (data.success === false) {
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

export const getPopularMovies = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
        {
            cache: "force-cache",
            next: {revalidate: 60 * 60 * 24}
        });

    const data = await res.json();

    if (data.success === false) {
        notFound();
    }

    const movies: Movie[] = data.results.map((movieData: any) => {
        return {
            id: movieData.id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            posterPath: movieData.poster_path,
            overview: movieData.overview,
            voteAverage: movieData.vote_average.toFixed(1),
            genres: movieData.genre_ids.map((genre: { name: string; }) => genre.name),
            runtime: movieData.runtime,
            backdropPath: movieData.backdrop_path,
            status: movieData.status
        }
    });

    return movies;
}

export const getUpcomingMovies = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
        {
            cache: "force-cache",
            next: {revalidate: 60 * 60 * 24}
        });

    const data = await res.json();

    if (data.success === false) {
        notFound();
    }

    const movies: Movie[] = data.results.map((movieData: any) => {
        return {
            id: movieData.id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            posterPath: movieData.poster_path,
            overview: movieData.overview,
            voteAverage: movieData.vote_average.toFixed(1),
            genres: movieData.genre_ids.map((genre: { name: string; }) => genre.name),
            runtime: movieData.runtime,
            backdropPath: movieData.backdrop_path,
            status: movieData.status
        }
    });

    return movies;
}


export const getTopRatedMovies = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
        {
            cache: "force-cache",
            next: {revalidate: 60 * 60 * 24}
        });

    const data = await res.json();

    if (data.success === false) {
        notFound();
    }

    const movies: Movie[] = data.results.map((movieData: any) => {
        return {
            id: movieData.id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            posterPath: movieData.poster_path,
            overview: movieData.overview,
            voteAverage: movieData.vote_average.toFixed(1),
            genres: movieData.genre_ids.map((genre: { name: string; }) => genre.name),
            runtime: movieData.runtime,
            backdropPath: movieData.backdrop_path,
            status: movieData.status
        }
    });

    return movies;
}

export const getTrendingMovies = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`,
        {
            cache: "force-cache",
            next: {revalidate: 60 * 60 * 24}
        });

    const data = await res.json();

    if (data.success === false) {
        notFound();
    }

    const movies: Movie[] = data.results.map((movieData: any) => {
        return {
            id: movieData.id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            posterPath: movieData.poster_path,
            overview: movieData.overview,
            voteAverage: movieData.vote_average.toFixed(1),
            genres: movieData.genre_ids.map((genre: { name: string; }) => genre.name),
            runtime: movieData.runtime,
            backdropPath: movieData.backdrop_path,
            status: movieData.status
        }
    });

    return movies;
}



export const getMoviesBySearch = async (query: string) => {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
        {
            cache: "force-cache",
            next: {revalidate: 60 * 60 * 24}
        });

    const data = await res.json();

    if (data.success === false) {
        notFound();
    }

    const movies: Movie[] = data.results.map((movieData: any) => {
        return {
            id: movieData.id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            posterPath: movieData.poster_path,
            overview: movieData.overview,
            voteAverage: movieData.vote_average.toFixed(1),
            genres: movieData.genre_ids.map((genre: { name: string; }) => genre.name),
            runtime: movieData.runtime,
            backdropPath: movieData.backdrop_path,
            status: movieData.status
        }
    });

    return movies;
}

export const getMovieVideos = async (movieId: string) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
        {
            cache: "force-cache",
            next: {revalidate: 60 * 60 * 24}
        });

    const data = await res.json();

    if (data.success === false) {
        notFound();
    }

    const videos: Video[] = data.results.map((videoData: any) => {
        return {
            id: videoData.id,
            key: videoData.key,
            name: videoData.name,
            site: videoData.site,
            type: videoData.type,
        }
    });

    return videos;
}


export const getMovieCredits = async (movieId: string) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
        {
            cache: "force-cache",
            next: {revalidate: 60 * 60 * 24}
        });

    const data = await res.json();

    if (data.success === false) {
        notFound();
    }


    const cast: Credit[] = data.cast.map((castData: any) => {
        return {
            id: +castData.id,
            name: castData.name,
            role: castData.job,
            profilePath: castData.profile_path,
        }
    });

    const crew: Credit[] = data.crew.map((crewData: any) => {
        return {
            id: +crewData.id,
            name: crewData.name,
            role: crewData.job,
            profilePath: crewData.profile_path,
        }
    });

    return {cast, crew};
}


export const getMovieGenres = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
        {
            cache: "force-cache",
        });

    const data = await res.json();

    const categories: Category[] = data.genres.map((categoryData: any) => {
        return {
            id: categoryData.id,
            name: categoryData.name,
        }
    });

    return categories;
}

export const getMoviesByGenre = async (genreId: string) => {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&with_genres=${genreId}&include_adult=fals&page=1` )

    const data = await res.json();

    if (data.success === false) {
        notFound();
    }

    const movies: Movie[] = data.results.map((movieData: any) => {
        return {
            id: movieData.id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            posterPath: movieData.poster_path,
            overview: movieData.overview,
            voteAverage: movieData.vote_average.toFixed(1),
            genres: movieData.genre_ids.map((genre: { name: string; }) => genre.name),
            runtime: movieData.runtime,
            backdropPath: movieData.backdrop_path,
            status: movieData.status
        }
    });

    return movies;
}
