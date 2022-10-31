import React from 'react'
import { useAppContext } from '../context/appContext'
import { translateGenres } from '../data/genre-data'

const MovieDetails: React.FC = () => {
  const { details } = useAppContext()

  const genres = details.genre.map((id) => translateGenres(id)).join(', ')

  return (
    <div className="pt-7 pb-6 px-5 flex flex-col justify-center items-center bg-black/[.54] text-gray-100">
      <h2 className="text-5xl">{details.title}</h2>
      <p className="text-base">({details.date})</p>
      <img
        className="w-2/3 max-w-xs mt-2 mb-4"
        src={details.poster}
        alt="Movie Poster"
      />
      <div className="flex items-baseline text-xl">
        <i className="fa-solid fa-star mr-1 text-yellow-400"></i>
        <p>{details.rating}</p>
      </div>
      <div className="min-w-1/2 flex flex-row justify-evenly items-center text-xl">
        <p>{genres}</p>
      </div>
      <div className="my-3 w-3/4 h-[1px] border-[1px] border-white/[.25]"></div>
      <div className="px-4">
        <p className="text-lg">{details.plot}</p>
      </div>
    </div>
  )
}

export default MovieDetails
