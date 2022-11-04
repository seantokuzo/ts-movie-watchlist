import React from 'react'
import { useAppContext } from '../context/appContext'
import { Movie } from '../util/convertTmdbData'

const WatchlistButton: React.FC<{
  addMovie: boolean
  movie: Movie
  details: boolean
}> = ({ addMovie, movie, details }) => {
  const { addToWatchlist, removeFromWatchlist } = useAppContext()

  const handleWatchlistBtn = (addMovie: boolean, movie: Movie) => {
    if (addMovie) {
      addToWatchlist(movie)
    } else {
      removeFromWatchlist(movie)
    }
  }

  const btnText = () => {
    if (details) {
      if (addMovie) return 'Add to Watchlist'
      if (!addMovie) return 'Remove from Watchlist'
    }
    return ''
  }

  const btnClasses = details ? 'px-4 py-3 mt-4' : 'p-2 absolute top-4 right-3'

  return (
    <button
      className={`flex justify-center items-center border-2 rounded-full bg-white shadow-lg text-black ${btnClasses}`}
      onClick={() => handleWatchlistBtn(addMovie, movie)}
    >
      {btnText()}
      <i
        className={`fa-solid fa-${addMovie ? 'plus' : 'minus'} ${
          details ? 'ml-3' : ''
        }`}
      ></i>
    </button>
  )
}

export default WatchlistButton
