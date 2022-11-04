import React, { useReducer, useContext } from 'react'
import { TMDB_KEY } from '../fake.env'
import { ActionType } from './actions'
import reducer from './reducer'

export const blankMovieObj = {
  id: 0,
  poster: '',
  title: 'Title unavailable',
  rating: 0,
  date: 'Date unavailable',
  genre: [],
  plot: 'Plot unavailable'
}

export interface Movie {
  id: number
  poster: string | ''
  title: string
  rating: number
  date: string
  genre: number[]
  plot: string
}

type Modes = 'home' | 'details' | 'reviews' | 'search' | 'watchlist'

export interface StateInterface {
  darkMode: boolean
  mode: Modes
  movies: Movie[] | []
  details: Movie
  reviews: string | ''
  searchResults: Movie[] | []
  watchlist: Movie[] | []
  isLoading: boolean
  showAlert: boolean
  alertType: 'success' | 'danger' | ''
  alertText: string
}

const localWatchlist = localStorage.getItem('watchlist')

const initialState: StateInterface = {
  darkMode: true,
  mode: 'home',
  movies: [],
  details: blankMovieObj,
  reviews: '',
  searchResults: [],
  watchlist: localWatchlist ? JSON.parse(localWatchlist) : [],
  isLoading: false,
  showAlert: false,
  alertType: '',
  alertText: ''
}

export interface AppContextInterface extends StateInterface {
  changeTheme: () => void
  setMovies: (movies: Movie[]) => void
  getNowPlaying: () => void
  getMovieDetails: (movie: Movie) => void
  getReviews: (movieId: number) => void
  setSearchMode: () => void
  setSearchResults: (movies: Movie[] | []) => void
  setWatchlistMode: () => void
  addToWatchlist: (movie: Movie) => void
  removeFromWatchlist: (movie: Movie) => void
}

// interface DispatchObject {
//   type: string
//   payload?: object
// }

// type Dispatch = (x: DispatchObject) => void

const AppContext = React.createContext<AppContextInterface>({
  ...initialState,
  changeTheme: () => null,
  setMovies: () => null,
  getNowPlaying: () => null,
  getMovieDetails: () => null,
  getReviews: () => null,
  setSearchMode: () => null,
  setSearchResults: () => null,
  setWatchlistMode: () => null,
  addToWatchlist: () => null,
  removeFromWatchlist: () => null
})

type Props = {
  children: JSX.Element | JSX.Element[]
}

const AppContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const changeTheme = () => {
    dispatch({ type: ActionType.CHANGE_THEME })
  }

  const setMovies = (movies: Movie[]) => {
    dispatch({ type: ActionType.SET_MOVIES_SUCCESS, payload: { movies } })
  }

  const getNowPlaying = () => {
    dispatch({ type: ActionType.GET_NOW_PLAYING })
  }

  const getMovieDetails = (movie: Movie) => {
    dispatch({
      type: ActionType.SET_DETAILS,
      payload: { selectedMovie: movie }
    })
  }

  const getReviews = async (movieId: number) => {
    console.log('Get reviews for movieId: ', movieId)
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${TMDB_KEY}&language=en-US&page=1`
    )
    const data = await res.json()
    console.log(data)
  }

  const setSearchMode = () => {
    dispatch({ type: ActionType.SET_SEARCH_MODE })
  }

  const setSearchResults = (movies: Movie[] | []) => {
    dispatch({ type: ActionType.SET_SEARCH_RESULTS, payload: { movies } })
  }

  const setWatchlistMode = () => {
    dispatch({ type: ActionType.SET_WATCHLIST_MODE })
  }

  const addToWatchlist = (movie: Movie) => {
    if (
      state.watchlist.some((watchlistMovie) => watchlistMovie.id === movie.id)
    ) {
      alert('Watchlist includes movie already')
      return
    }

    const updatedWatchlist = [...state.watchlist, movie]
    dispatch({
      type: ActionType.ADD_TO_WATCHLIST,
      payload: { updatedWatchlist }
    })
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
  }

  const removeFromWatchlist = (movie: Movie) => {
    const updatedWatchlist = [
      ...state.watchlist.filter((mov) => mov.id !== movie.id)
    ]
    dispatch({
      type: ActionType.REMOVE_FROM_WATCHLIST,
      payload: { updatedWatchlist }
    })
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        changeTheme,
        setMovies,
        getNowPlaying,
        getMovieDetails,
        getReviews,
        setSearchMode,
        setSearchResults,
        setWatchlistMode,
        addToWatchlist,
        removeFromWatchlist
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext) as AppContextInterface
}

export { initialState, AppContextProvider, useAppContext }
