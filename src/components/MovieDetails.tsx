import React from 'react'
import { useAppContext } from '../context/appContext'
import genreIds from '../data/genre-data'

const MovieDetails: React.FC = () => {
  const { details } = useAppContext()

  // const translateGenres = details.genre.map((id) => genreIds[id])

  return (
    <div>
      <img src={details.poster} alt="Movie Poster" />
      <div>
        <div>
          <h2>{details.title}</h2>
          <p>{details.rating}</p>
        </div>
        <div>
          <div>
            <p>{details.date}</p>
            {/* <p>{translateGenres.join(', ')}</p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
