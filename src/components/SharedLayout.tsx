import React from 'react'
import { useAppContext } from '../context/appContext'
import CurrentMovies from './CurrentMovies'

const SharedLayout = () => {
  const { mode } = useAppContext()
  console.log(mode)

  return (
    <div className="w-screen h-screen flex flex-col content-center items-center">
      {mode === 'home' && <CurrentMovies />}
    </div>
  )
}

export default SharedLayout
