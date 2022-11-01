import React from 'react'
import { Movie, useAppContext } from '../context/appContext'

const WatchlistAddButton: React.FC<{ movie: Movie }> = ({ movie }) => {
  const { mode, addToWatchlist } = useAppContext()
  return (
    <button
      className={`mt-4 px-4 py-3 border-2 rounded-full bg-white${
        mode === 'details' ? '/[0.5]' : ''
      } shadow-lg text-black`}
      onClick={() => addToWatchlist(movie)}
    >
      {mode === 'details' ? 'Add to Watchlist' : ''}
      <i className={`fa-solid fa-plus ${mode === 'details' ? 'ml-2' : ''}`}></i>
    </button>
  )
}

const WatchlistRemoveButton: React.FC<{ movie: Movie }> = ({ movie }) => {
  const { mode, removeFromWatchlist } = useAppContext()
  return (
    <button
      className={`mt-4 px-4 py-3 border-2 rounded-full bg-white${
        mode === 'details' ? '/[0.5]' : ''
      } shadow-lg text-black`}
      onClick={() => removeFromWatchlist(movie)}
    >
      {mode === 'details' ? 'Remove from Watchlist' : ''}
      <i
        className={`fa-solid fa-minus ${mode === 'details' ? 'ml-2' : ''}`}
      ></i>
    </button>
  )
}

export { WatchlistAddButton, WatchlistRemoveButton }
