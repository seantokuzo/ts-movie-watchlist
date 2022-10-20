import React from 'react'
import { Movie, useAppContext } from '../context/appContext'

const MovieCardBasic: React.FC<{ movie: Movie }> = ({ movie }) => {
  const { getMovieDetails } = useAppContext()

  return (
    <div
      className="w-1/2 lg:w-1/3 max-w-lg px-1 py-2 flex flex-col content-center items-center"
      onClick={() => getMovieDetails(movie.id)}
    >
      <img src={movie.poster} alt="Movie Poster" className="w-full"></img>
      <h3 className='text-lg text-center leading-none mt-2'>{movie.title}</h3>
    </div>
  )
}

export default MovieCardBasic
