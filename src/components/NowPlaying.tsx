import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import MovieCardBasic from './MovieCardBasic'

const NowPlaying: React.FC = () => {
  const { darkMode, movies, getNowPlaying } = useAppContext()

  useEffect(() => {
    getNowPlaying()
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
    <div
      className={`w-full max-w-4xl flex flex-col justify-center items-center p-5 text-${
        darkMode ? 'white' : 'black'
      }`}
    >
      <h2 className="text-4xl px-5 py-1">Now Playing</h2>
      <div className="w-full mt-4 flex flex-row flex-wrap justify-center items-start">
        {movieEls}
      </div>
    </div>
  )
}

export default NowPlaying
