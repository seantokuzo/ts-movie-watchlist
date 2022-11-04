import React from 'react'
import { useAppContext } from '../context/appContext'
import NowPlaying from './NowPlaying'
import MovieDetails from './MovieDetails'
import Reviews from './Reviews'
import Search from './Search'
import Watchlist from './Watchlist'

const SharedLayout = () => {
  const { mode } = useAppContext()

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {mode === 'home' && <NowPlaying />}
      {mode === 'details' && <MovieDetails />}
      {mode === 'search' && <Search />}
      {mode === 'watchlist' && <Watchlist />}
    </div>
  )
}

export default SharedLayout
