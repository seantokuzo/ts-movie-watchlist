import React from 'react'
import { useAppContext } from '../context/appContext'
import CurrentMovies from './CurrentMovies'

const SharedLayout = () => {
  const { mode } = useAppContext()
  console.log(mode)

  return <div>{mode === 'home' && <CurrentMovies />}</div>
}

export default SharedLayout
