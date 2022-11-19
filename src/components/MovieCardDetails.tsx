// import { useState, useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { translateGenres } from '../data/genre-data'
import { Movie } from '../util/convertTmdbData'

const MovieCardDetails: React.FC<{ movie: Movie }> = ({ movie }) => {
  // const [isOverflowed, setIsOverflowed] = useState(false)
  // const [showOverflow, setShowOverflow] = useState(false)

  // console.log(isOverflowed)

  const {
    mode,
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    getMovieDetails
  } = useAppContext()

  // useEffect(() => {
  //   const descriptionEl = document.getElementById(
  //     `description-${movie.id}`
  //   ) as HTMLParagraphElement

  //   console.log(descriptionEl.style)

  //   STACK OVERFLOW SOLUTION
  //   const currOverflow = descriptionEl.style.overflow
  //   descriptionEl.style.overflow = 'hidden'
  //   const isOverflowing =
  //     descriptionEl.clientHeight < descriptionEl.scrollHeight
  //   setIsOverflowed(isOverflowing)
  //   descriptionEl.style.overflow = currOverflow

  //   // eslint-disable-next-line
  // }, [])

  const genres = movie.genre.map((id) => translateGenres(id)).join(', ')

  const moviePosterEl = movie.poster ? (
    <div className="relative w-2/5 mt-2 mb-4">
      <img
        src={movie.poster}
        alt="Movie Poster"
        // className="w-1/4 max-w-xs mt-2 mb-4"
        className="w-full min-w-4xl"
        onClick={() => getMovieDetails(movie)}
      ></img>
    </div>
  ) : (
    <div className="relative w-2/5 mt-2 mb-4">
      <img
        src="./img/no_img.png"
        className="w-full min-w-4xl"
        style={{ textShadow: '5px 5px 5px rgba(0, 0, 0, 0.7)' }}
        onClick={() => getMovieDetails(movie)}
        alt="No Poster"
      ></img>
      <p className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-3xl text-center">
        Poster Unavailable
      </p>
    </div>
  )

  const handleClick = () => {
    if (
      mode === 'watchlist' ||
      watchlist.some((myMovie) => myMovie.id === movie.id)
    ) {
      return removeFromWatchlist(movie)
    }
    return addToWatchlist(movie)
  }

  return (
    <div className="my-2 pt-7 pb-6 md:px-8 flex flex-col justify-center items-center text-gray-100 bg-black/[0.25] rounded-md shadow-lg">
      <div className="w-full px-6 flex justify-between items-center">
        {moviePosterEl}
        <div className="w-full flex flex-col items-start ml-8">
          <div className="flex justify-start items-center">
            <h2 className="text-2xl md:text-4xl">{movie.title}</h2>
            <div className="flex justify-start items-baseline ml-5">
              <p className="text-sm">{movie.rating}</p>
              <i className="fa-solid fa-star ml-2 text-yellow-400"></i>
            </div>
            <button
              className="ml-5 p-2 flex justify-center items-center border-2 rounded-full bg-white shadow-lg text-black hover:scale-105"
              onClick={handleClick}
            >
              <i
                className={`fa-solid fa-${
                  watchlist.some((myMovie) => myMovie.id === movie.id)
                    ? 'minus'
                    : 'plus'
                } text-xs md:text-sm`}
              ></i>
            </button>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-base">({movie.date})</p>
            <p>{genres}</p>
          </div>
          <div className="mt-2">
            <p
              id={`description-${movie.id}`}
              className="text-sm max-h-16 overflow-auto text-ellipsis"
            >
              {movie.plot}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCardDetails
