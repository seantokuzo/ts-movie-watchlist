import React from 'react'
import { useAppContext } from '../context/appContext'
import { translateGenres } from '../data/genre-data'

const MovieDetails: React.FC = () => {
  const { details } = useAppContext()

  const genres = details.genre.map((id) => translateGenres(id)).join(', ')

  return (
    <div className="my-5 p-5 flex content-center items-center border-2 bg-black/[.54]">
      <img className="w-1/3 max-w-xs" src={details.poster} alt="Movie Poster" />
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
          <div>
            <p>{details.plot}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
