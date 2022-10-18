import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { TMDB_KEY } from '../fake.env'
import MovieCardBasic from './MovieCardBasic'

const fetchString = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&now-playing&popularity.gte=3000?language=en-US`

interface TmdbMovieResponse {
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
        console.log(data.results)
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
        <MovieCardBasic movie={movie} />
      ))}
    </>
  )

  return (
    <div className="w-screen h-screen p-5 flex flex-row flex-wrap items-center">
      {movieEls}
    </div>
  )
}

export default CurrentMovies
