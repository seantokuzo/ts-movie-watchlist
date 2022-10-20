import React from 'react'
import { useAppContext } from '../context/appContext'
import { translateGenres } from '../data/genre-data'

const MovieDetails: React.FC = () => {
  const { details } = useAppContext()

  const genres = details.genre.map((id) => translateGenres(id)).join(', ')

  return (
    <div className="w-full p-5 flex flex-col content-center items-center">
      <img className="w-2/3" src={details.poster} alt="Movie Poster" />
      <div>
        <div>
          <h2>{details.title}</h2>
          <p>{details.rating}</p>
        </div>
        <div>
          <div>
            <p>{details.date}</p>
            <p>{genres}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
