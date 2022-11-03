import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
// SIGN UP @ https://developers.themoviedb.org/3/getting-started/introduction to get your own API key
import { TMDB_KEY } from '../fake.env'
import MovieCardBasic from './MovieCardBasic'
import { convertTmdbData } from '../util/convertTmdbData'

const fetchString = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&now-playing&popularity.gte=3000?language=en-US`

const NowPlaying: React.FC = () => {
  const { movies, setMovies } = useAppContext()

  useEffect(() => {
    fetch(fetchString)
      .then((res) => res.json())
      .then((data) => setMovies(convertTmdbData(data.results)))
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
    <div className="w-full max-w-4xl flex flex-col justify-center items-center p-5">
      <h2 className="text-4xl">Now Playing</h2>
      <div className="w-full flex flex-row flex-wrap justify-center items-start">
        {movieEls}
      </div>
    </div>
  )
}

export default NowPlaying
