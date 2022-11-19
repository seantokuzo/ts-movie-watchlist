import React from 'react'
import { useAppContext } from '../context/appContext'
import WatchlistButton from './WatchlistButton'
import { translateGenres } from '../data/genre-data'
import Reviews from './Reviews'

const MovieDetails: React.FC = () => {
  const {
    details,
    watchlist,
    showReviews,
    getReviews,
    hideReviews,
    setModeNowPlaying
  } = useAppContext()

  const genres = details.genre.map((id) => translateGenres(id)).join(', ')

  const moviePosterEl = details.poster ? (
    <img
      src={details.poster}
      alt="Movie Poster"
      className="w-2/3 max-w-xs mt-2 mb-4"
      onClick={setModeNowPlaying}
    ></img>
  ) : (
    <img
      src="./img/no_img.png"
      className="w-2/3 max-w-xs mt-2 mb-4"
      style={{ textShadow: '5px 5px 5px rgba(0, 0, 0, 0.7)' }}
      onClick={setModeNowPlaying}
      alt="No Poster"
    >
      {/* <p className="text-3xl text-center">Poster Unavailable</p> */}
    </img>
  )

  const watchlistBtn = () => {
    if (watchlist.some((movie) => movie.id === details.id)) {
      return <WatchlistButton addMovie={false} movie={details} details={true} />
    } else {
      return <WatchlistButton addMovie={true} movie={details} details={true} />
    }
  }

  return (
    <div className="pt-7 pb-6 px-5 flex flex-col justify-center items-center text-gray-100">
      <h2 className="text-5xl">{details.title}</h2>
      <p className="text-base">({details.date})</p>
      {moviePosterEl}
      <div className="min-w-1/2 flex flex-row justify-evenly items-center text-xl">
        <p>{genres}</p>
      </div>
      <div className="flex items-baseline text-xl">
        <p>{details.rating}</p>
        <i className="fa-solid fa-star ml-1 text-yellow-400"></i>
      </div>
      {showReviews && <Reviews />}
      <button
        className="flex justify-center items-center px-5 py-1 mt-2 border-2 rounded-full bg-white shadow-lg text-black hover:scale-105"
        onClick={() => (showReviews ? hideReviews() : getReviews(details.id))}
      >
        {showReviews ? 'Hide Reviews' : 'Reviews'}
      </button>
      <div className="my-3 w-3/4 h-[1px] border-[1px] border-white/[.25]"></div>
      <div className="px-4">
        <p className="text-lg">{details.plot}</p>
      </div>
      {watchlistBtn()}
    </div>
  )
}

export default MovieDetails
