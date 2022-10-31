import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
// SIGN UP @ https://developers.themoviedb.org/3/getting-started/introduction to get your own API key
import { TMDB_KEY } from '../fake.env'
import MovieCardBasic from './MovieCardBasic'

const fetchString = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&now-playing&popularity.gte=3000?language=en-US`

export interface TmdbMovieResponse {
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

const CurrentMovies: React.FC = () => {
  const { movies, setMovies } = useAppContext()

  useEffect(() => {
    fetch(fetchString)
      .then((res) => res.json())
      .then((data) => {
        setMovies(
          data.results.map((movie: TmdbMovieResponse) => ({
            id: movie.id,
            poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            title: movie.title,
            rating: movie.vote_average,
            date: movie.release_date ? movie.release_date.slice(0, 4) : 'N/A',
            genre: movie.genre_ids,
            plot: movie.overview
          }))
        )
      })
      .catch((err) => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const movieEls = (
    <>
      {movies.map((movie) => (
        <MovieCardBasic movie={movie} key={movie.id} />
      ))}
    </>
  )

  return (
    <div className="w-full max-w-4xl flex flex-col content-center items-center p-5 bg-blue-400">
      <h2 className="text-4xl">Now Playing</h2>
      <div className="w-full flex flex-row flex-wrap content-between items-start">
        {movieEls}
      </div>
    </div>
  )
}

export default CurrentMovies
