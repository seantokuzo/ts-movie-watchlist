import React from 'react'
import { useAppContext } from '../context/appContext'
import { TMDB_KEY } from '../fake.env'
import MovieCardBasic from './MovieCardBasic'
import { convertTmdbData } from '../util/convertTmdbData'

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
            setSearchResults('none')
          } else if (data.results.length > 0) {
            setSearchResults(convertTmdbData(data.results))
          }
        })
        .catch((err) => {
          console.log(err)
          setSearchResults([])
        })
    }
  }

  const movieEls = () => {
    if (searchResults === 'none') {
      return (
        <div className="w-full mt-4 flex flex-col justify-center items-center">
          <h3 className="text-4xl font-semibold">No Results</h3>
          <i className="fa-solid fa-circle-question mt-2 text-8xl text-black/[0.5]"></i>
          <h3 className="mt-2 text-2xl font-semibold">Try again</h3>
        </div>
      )
    }
    if (searchResults.length > 0) {
      return (
        <>
          {searchResults.map((movie) => (
            <MovieCardBasic movie={movie} key={movie.id} />
          ))}
        </>
      )
    }
    return (
      <div className="w-full mt-4 flex flex-col justify-center items-center">
        <h3 className="text-4xl font-semibold">Find some Movies</h3>
        <i className="fa-solid fa-film mt-2 text-8xl text-black/[0.5]"></i>
      </div>
    )
  }

  return (
    <div className="w-full px-7 flex flex-col items-center">
      <input
        className="w-3/4 h-[2.5rem] mt-[-1.25rem] mb-4 px-1 py-1 rounded text-black text-lg font-medium text-center shadow-lg"
        onChange={(e) => handleSearch(e)}
        type="text"
        placeholder="Search for a movie"
        results={0}
        maxLength={80}
        minLength={1}
      ></input>
      <div className="w-full flex flex-row flex-wrap justify-center items-start">
        {movieEls()}
      </div>
    </div>
  )
}

export default Search
