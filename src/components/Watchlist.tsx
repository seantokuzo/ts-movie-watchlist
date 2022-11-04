import React from 'react'
import { useAppContext } from '../context/appContext'
import MovieCardBasic from './MovieCardBasic'

const Watchlist: React.FC = () => {
  const { watchlist } = useAppContext()

  const movieEls = (
    <>
      {watchlist.map((movie) => (
        <MovieCardBasic movie={movie} key={movie.id} />
      ))}
    </>
  )

  return (
    <div className="w-full max-w-4xl flex flex-col content-center items-center p-5">
      <h2 className="text-4xl">My Watchlist</h2>
      <div className="w-full flex flex-row flex-wrap justify-evenly items-start">
        {movieEls}
      </div>
    </div>
  )
}

export default Watchlist
