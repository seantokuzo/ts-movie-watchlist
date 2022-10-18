import React from 'react'
import { Movie } from '../context/appContext'

const MovieCardBasic: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <div className="w-1/3 m-2 flex flex-col content-center items-center">
      <img src={movie.poster} alt="Movie Poster" className="w-full"></img>
      <h2>{movie.title}</h2>
    </div>
  )
}

export default MovieCardBasic
