import React, { useReducer, useContext } from 'react'
import { TMDB_KEY } from '../fake.env'
import {
  convertTmdbData,
  Movie,
  Review,
  TmdbMovieData,
  TmdbReview
} from '../util/convertTmdbData'
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

export type AppMode = 'now-playing' | 'details' | 'search' | 'watchlist'
export type AlertType = 'success' | 'danger' | ''

export interface StateInterface {
  darkMode: boolean
  mode: AppMode
  movies: Movie[] | []
  details: Movie
  showReviews: boolean
  reviews: Review[] | []
  searchResults: Movie[] | [] | 'none'
  watchlist: Movie[] | []
  isLoading: boolean
  showAlert: boolean
  alertType: AlertType
  alertText: string
}

const localWatchlist = localStorage.getItem('watchlist')

const initialState: StateInterface = {
  darkMode: true,
  mode: 'now-playing',
  movies: [],
  details: blankMovieObj,
  reviews: [],
  showReviews: false,
  searchResults: [],
  watchlist: localWatchlist ? JSON.parse(localWatchlist) : [],
  isLoading: false,
  showAlert: false,
  alertType: '',
  alertText: ''
}

export interface AppContextInterface extends StateInterface {
  displayAlert: (alertType: AlertType, msg: string) => void
  clearAlert: (time: number) => void
  changeTheme: () => void
  getNowPlaying: () => void
  setModeNowPlaying: () => void
  getMovieDetails: (movie: Movie) => void
  getReviews: (movieId: number) => void
  hideReviews: () => void
  setModeSearch: () => void
  setSearchResults: (movies: Movie[] | [] | 'none') => void
  setModeWatchlist: () => void
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
  displayAlert: () => null,
  clearAlert: () => null,
  changeTheme: () => null,
  getNowPlaying: () => null,
  setModeNowPlaying: () => null,
  getMovieDetails: () => null,
  getReviews: () => null,
  hideReviews: () => null,
  setModeSearch: () => null,
  setSearchResults: () => null,
  setModeWatchlist: () => null,
  addToWatchlist: () => null,
  removeFromWatchlist: () => null
})

type Props = {
  children: JSX.Element | JSX.Element[]
}

const AppContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const displayAlert = (alertType: AlertType, msg: string) => {
    dispatch({ type: ActionType.SHOW_ALERT, payload: { alertType, msg } })
    clearAlert()
  }

  const clearAlert = (time: number = 2000) => {
    setTimeout(() => {
      dispatch({ type: ActionType.CLEAR_ALERT })
    }, time)
  }

  const changeTheme = () => {
    dispatch({ type: ActionType.CHANGE_THEME })
  }

  const getNowPlaying = async () => {
    dispatch({ type: ActionType.GET_NOW_PLAYING_BEGIN })
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&now-playing&popularity.gte=3000?language=en-US`
      )
      const data = await res.json()
      if (!data.results) {
        displayAlert('danger', 'Poopsicle! \nSomething went wrong')
        return
      }
      dispatch({
        type: ActionType.GET_NOW_PLAYING_SUCCESS,
        payload: {
          movies: convertTmdbData(
            data.results.sort(
              (a: TmdbMovieData, b: TmdbMovieData) =>
                b.popularity - a.popularity
            )
          )
        }
      })
    } catch (err) {
      // console.log(err)
      displayAlert('danger', 'Poopsicle! \nSomething went wrong')
    }
    clearAlert()
  }

  const setModeNowPlaying = () => {
    dispatch({ type: ActionType.MODE_NOW_PLAYING })
  }

  const getMovieDetails = (movie: Movie) => {
    dispatch({
      type: ActionType.SET_DETAILS,
      payload: { selectedMovie: movie }
    })
  }

  const getReviews = async (movieId: number) => {
    // dispatch({ type: ActionType.GET_REVIEWS_BEGIN })
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      const data = await res.json()
      if (data.results.length > 0) {
        const formattedReviews = data.results.map((review: TmdbReview) => ({
          author: review.author_details.username || review.author,
          review: review.content,
          date: new Date(review.created_at).toLocaleDateString()
        }))
        dispatch({
          type: ActionType.GET_REVIEWS_SUCCESS,
          payload: { reviews: formattedReviews }
        })
      }
    } catch (err) {
      // console.log(err)
      displayAlert('danger', 'Uh oh!\nSomething went wrong')
    }
  }

  const hideReviews = () => {
    dispatch({ type: ActionType.HIDE_REVIEWS })
  }

  const setModeSearch = () => {
    dispatch({ type: ActionType.SET_SEARCH_MODE })
  }

  const setSearchResults = (movies: Movie[] | [] | 'none') => {
    dispatch({ type: ActionType.SET_SEARCH_RESULTS, payload: { movies } })
  }

  const setModeWatchlist = () => {
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
        displayAlert,
        clearAlert,
        changeTheme,
        getNowPlaying,
        setModeNowPlaying,
        getMovieDetails,
        getReviews,
        hideReviews,
        setModeSearch,
        setSearchResults,
        setModeWatchlist,
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
