import React, { useReducer, useContext } from 'react'
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

export interface StateInterface {
  mode: 'home' | 'details' | 'search' | 'watchlist'
  movies: Movie[] | []
  details: Movie
  searchResults: Movie[] | []
  watchlist: Movie[] | []
  isLoading: boolean
  showAlert: boolean
  AlertType: 'success' | 'danger' | ''
  AlertText: string
}

const localWatchlist = localStorage.getItem('watchlist')

const initialState: StateInterface = {
  mode: 'home',
  movies: [],
  details: blankMovieObj,
  searchResults: [],
  watchlist: localWatchlist ? JSON.parse(localWatchlist) : [],
  isLoading: false,
  showAlert: false,
  AlertType: '',
  AlertText: ''
}

export interface AppContextInterface extends StateInterface {
  setMovies: (movies: Movie[]) => void
  getNowPlaying: () => void
  getMovieDetails: (movie: Movie) => void
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
  setMovies: () => null,
  getNowPlaying: () => null,
  getMovieDetails: () => null,
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
    const updatedWatchlist = [...state.watchlist.filter((mov) => mov.id !== movie.id)]
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
        setMovies,
        getMovieDetails,
        getNowPlaying,
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
