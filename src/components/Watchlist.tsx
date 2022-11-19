import React from 'react'
import { useAppContext } from '../context/appContext'
import MovieCardDetails from './MovieCardDetails'

const Watchlist: React.FC = () => {
  const { watchlist } = useAppContext()

  const movieEls = (
    <>
      {watchlist.map((movie) => (
        <MovieCardDetails movie={movie} key={movie.id} />
      ))}
    </>
  )

  return (
    <div className="w-full max-w-4xl flex flex-col content-center items-center p-5">
      <div className="flex justify-center items-center px-6 py-4 bg-black/[0.25] rounded-lg shadow-lg">
        <h2 className="text-4xl lg:text-6xl font-semibold text-white">My Watchlist</h2>
      </div>
      <div className="w-full flex flex-row flex-wrap justify-evenly items-start">
        {movieEls}
      </div>
    </div>
  )
}

export default Watchlist
