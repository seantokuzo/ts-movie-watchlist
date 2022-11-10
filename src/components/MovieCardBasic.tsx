import React from 'react'
import { useAppContext } from '../context/appContext'
import { Movie } from '../util/convertTmdbData'
import WatchlistButton from './WatchlistButton'

const MovieCardBasic: React.FC<{ movie: Movie }> = ({ movie }) => {
  const { watchlist, getMovieDetails } = useAppContext()

  const moviePosterEl = movie.poster ? (
    <img
      src={movie.poster}
      alt="Movie Poster"
      className="w-full"
    ></img>
  ) : (
    // <div className="w-full h-[14.25rem] flex flex-col justify-center items-center border-2 bg-black/[.5]">
    <div className="w-full h-full min-h-[12rem] flex flex-col justify-center items-center border-2 bg-black/[.5]">
      <p
        className="text-3xl text-center text-white-400"
        style={{ textShadow: '5px 5px 5px rgba(0, 0, 0, 0.7)' }}
      >
        Poster Unavailable
      </p>
    </div>
  )

  const watchlistBtn = () => {
    if (watchlist.some((myMovie) => myMovie.id === movie.id)) {
      return <WatchlistButton addMovie={false} movie={movie} details={false} />
    } else {
      return <WatchlistButton addMovie={true} movie={movie} details={false} />
    }
  }

  return (
    <div className="relative w-1/2 lg:w-1/3 max-w-xs px-1 py-2 flex flex-col justify-center items-center">
      <div className="w-full" onClick={() => getMovieDetails(movie)}>
        {moviePosterEl}
        <h3 className="text-lg text-center leading-none mt-2">{movie.title}</h3>
      </div>
      {watchlistBtn()}
    </div>
  )
}

export default MovieCardBasic
