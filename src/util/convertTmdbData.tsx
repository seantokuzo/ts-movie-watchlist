interface TmdbMovieData {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface TmdbReview {
  author: string
  author_details: {
    name?: string
    username?: string
    avatar_path?: string
    rating?: number
  }
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

export interface Review {
  author: string
  review: string
  date: string
}

export interface Movie {
  id: number
  poster: string | ''
  title: string
  rating: number
  date: string
  genre: number[]
  plot: string
}

export const convertTmdbData = (movieData: TmdbMovieData[]): Movie[] => {
  return movieData.map((movie) => ({
    id: movie.id,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
      : '',
    title: movie.title,
    rating: movie.vote_average,
    date: movie.release_date ? movie.release_date.slice(0, 4) : 'N/A',
    genre: movie.genre_ids,
    plot: movie.overview
  }))
}
