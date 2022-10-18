import React, { useReducer, useContext } from 'react'
import { ActionType } from './actions'
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
  mode: 'home'
  movies: Movie[] | []
  isLoading: boolean
  showAlert: boolean
  AlertType: 'success' | 'danger' | ''
  AlertText: string
}

const initialState: StateInterface = {
  mode: 'home',
  movies: [],
  isLoading: false,
  showAlert: false,
  AlertType: '',
  AlertText: ''
}

export interface AppContextInterface extends StateInterface {
  setMovies: (movies: Movie[]) => void
}

// interface DispatchObject {
//   type: string
//   payload?: object
// }

// type Dispatch = (x: DispatchObject) => void

const AppContext = React.createContext<AppContextInterface>({
  ...initialState,
  setMovies: () => null
})

type Props = {
  children: JSX.Element | JSX.Element[]
}

const AppContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setMovies = (movies: Movie[]) => {
    dispatch({ type: ActionType.SET_MOVIES_SUCCESS, payload: { movies } })
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
  return useContext(AppContext) as AppContextInterface
}

export { initialState, AppContextProvider, useAppContext }
