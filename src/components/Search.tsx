import React from 'react'
import { useAppContext } from '../context/appContext'
import { TmdbMovieResponse } from './CurrentMovies'
import { TMDB_KEY } from '../fake.env'
import MovieCardBasic from './MovieCardBasic'

const Search: React.FC = () => {
  const { searchResults, setSearchResults } = useAppContext()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setSearchResults([])
    }
    if (e.target.value) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${e.target.value}&page=1`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) {
            setSearchResults([])
          } else if (data.total_results === 0) {
            setSearchResults([])
          } else if (data.results.length > 0) {
            setSearchResults(
              data.results.map((movie: TmdbMovieResponse) => ({
                id: movie.id,
                poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                title: movie.title,
                rating: movie.vote_average,
                date: movie.release_date
                  ? movie.release_date.slice(0, 4)
                  : 'N/A',
                genre: movie.genre_ids,
                plot: movie.overview
              }))
            )
          }
        })
        .catch((err) => {
          console.log(err)
          setSearchResults([])
        })
    }
  }

  const movieEls = (
    <>
      {searchResults.map((movie) => (
        <MovieCardBasic movie={movie} key={movie.id} />
      ))}
    </>
  )

  return (
    <div className='w-full px-7 flex flex-col items-center'>
      <input
        className='w-3/4 px-1 py-1 rounded text-lg font-medium text-center'
        onChange={(e) => handleSearch(e)}
        type="text"
        placeholder="Search for a movie"
        results={0}
        maxLength={80}
        minLength={1}
      ></input>
      <div className="w-full flex flex-row flex-wrap content-between items-start">
        {movieEls}
      </div>
    </div>
  )
}

export default Search