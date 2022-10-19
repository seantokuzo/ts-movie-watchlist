import React from 'react'
import { useAppContext } from '../context/appContext'
import CurrentMovies from './CurrentMovies'
import MovieDetails from './MovieDetails'

const SharedLayout = () => {
  const { mode } = useAppContext()

  return (
    <div className="w-screen h-screen flex flex-col content-center items-center">
      {mode === 'home' && <CurrentMovies />}
      {mode === 'details' && <MovieDetails />}
    </div>
  )
}

export default SharedLayout
