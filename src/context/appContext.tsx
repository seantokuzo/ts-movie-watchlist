import React, { useReducer, useContext } from 'react'
import { SET_MOVIES_SUCCESS } from './actions'
import reducer from './reducer'

export interface Movie {
  id: number
  poster: string
  title: string
  rating: number
  date: string
  genre: number[]
  plot: 'string'
}

export interface StateInterface {
  mode: string
  movies: Movie[] | []
}

const initialState: StateInterface = {
  mode: 'home',
  movies: []
}

export interface AppContextInterface extends StateInterface {
  setMovies?: (movies: Movie[]) => void
}

// const AppContext = React.createContext<AppContextInterface | null>(null)
const AppContext = React.createContext<AppContextInterface>(initialState)

type Props = {
  children: JSX.Element | JSX.Element[]
}

const AppContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer<Reducer>(reducer, initialState)

  const setMovies = (movies: Movie[]) => {
    dispatch({ type: SET_MOVIES_SUCCESS, payload: { movies } })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        setMovies
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { initialState, AppContextProvider, useAppContext }
