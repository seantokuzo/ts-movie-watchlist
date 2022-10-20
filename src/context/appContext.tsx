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
  poster: string
  title: string
  rating: number
  date: string
  genre: number[]
  plot: string
}

export interface StateInterface {
  mode: 'home' | 'details'
  movies: Movie[] | []
  details: Movie
  isLoading: boolean
  showAlert: boolean
  AlertType: 'success' | 'danger' | ''
  AlertText: string
}

const initialState: StateInterface = {
  mode: 'home',
  movies: [],
  details: blankMovieObj,
  isLoading: false,
  showAlert: false,
  AlertType: '',
  AlertText: ''
}

export interface AppContextInterface extends StateInterface {
  setMovies: (movies: Movie[]) => void
  getNowPlaying: () => void
  getMovieDetails: (movieId: number) => void
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
  getMovieDetails: () => null
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

  const getMovieDetails = (movieId: number) => {
    const selectedMovie = state.movies.filter(
      (movie) => movie.id === movieId
    )[0]
    console.log(selectedMovie)
    dispatch({ type: ActionType.SET_DETAILS, payload: { selectedMovie } })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        setMovies,
        getMovieDetails,
        getNowPlaying
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
