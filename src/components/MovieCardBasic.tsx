import React from 'react'
import { useAppContext } from '../context/appContext'
import { Movie } from '../util/convertTmdbData'
import WatchlistButton from './WatchlistButton'

const MovieCardBasic: React.FC<{ movie: Movie }> = ({ movie }) => {
  const { watchlist, getMovieDetails } = useAppContext()

  const moviePosterEl = movie.poster ? (
    <img src={movie.poster} alt="Movie Poster" className="w-full"></img>
  ) : (
    <img
      src="./img/no_img.png"
      className="w-2/3 max-w-xs mt-2 mb-4"
      style={{ textShadow: '5px 5px 5px rgba(0, 0, 0, 0.7)' }}
      alt="No Poster"
    >
      {/* <p className="text-3xl text-center">Poster Unavailable</p> */}
    </img>
  )

  const watchlistBtn = () => {
    if (watchlist.some((myMovie) => myMovie.id === movie.id)) {
      return <WatchlistButton addMovie={false} movie={movie} details={false} />
    } else {
      return <WatchlistButton addMovie={true} movie={movie} details={false} />
    }
  }

  return (
    <div className="relative md:w-1/3 w-1/2 max-w-xs px-2 py-2 flex flex-col justify-center items-center hover:scale-105 transition-all">
      <div className="w-full" onClick={() => getMovieDetails(movie)}>
        {moviePosterEl}
        <h3 className="text-lg text-center leading-none mt-2">{movie.title}</h3>
      </div>
      {watchlistBtn()}
    </div>
  )
}

export default MovieCardBasic
