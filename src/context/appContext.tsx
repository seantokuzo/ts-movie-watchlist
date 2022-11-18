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

type Modes = 'home' | 'details' | 'search' | 'watchlist'

export interface StateInterface {
  darkMode: boolean
  mode: Modes
  movies: Movie[] | []
  details: Movie
  showReviews: boolean
  reviews: Review[] | []
  searchResults: Movie[] | [] | 'none'
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
  clearAlert: () => void
  changeTheme: () => void
  getNowPlaying: () => void
  changeModeNowPlaying: () => void
  getMovieDetails: (movie: Movie) => void
  getReviews: (movieId: number) => void
  hideReviews: () => void
  setSearchMode: () => void
  setSearchResults: (movies: Movie[] | [] | 'none') => void
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
  clearAlert: () => null,
  changeTheme: () => null,
  getNowPlaying: () => null,
  changeModeNowPlaying: () => null,
  getMovieDetails: () => null,
  getReviews: () => null,
  hideReviews: () => null,
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

  const clearAlert = (time: number = 3000) => {
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
        dispatch({
          type: ActionType.GET_NOW_PLAYING_ERROR,
          payload: { msg: 'Poopsicle! \nSomething went wrong' }
        })
        clearAlert()
        return
      }
      setTimeout(() => {
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
      }, 1500)
    } catch (err) {
      console.log(err)
      dispatch({
        type: ActionType.GET_NOW_PLAYING_ERROR,
        payload: { msg: 'Poopsicle! \nSomething went wrong' }
      })
    }
    clearAlert()
  }

  const changeModeNowPlaying = () => {
    dispatch({ type: ActionType.MODE_NOW_PLAYING })
  }

  const getMovieDetails = (movie: Movie) => {
    dispatch({
      type: ActionType.SET_DETAILS,
      payload: { selectedMovie: movie }
    })
  }

  const getReviews = async (movieId: number) => {
    console.log('Get reviews for movieId: ', movieId)
    // dispatch({ type: ActionType.GET_REVIEWS_BEGIN })
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      const data = await res.json()
      console.log(data)
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
      console.log(err)
      dispatch({
        type: ActionType.GET_REVIEWS_ERROR,
        payload: { msg: 'Uh oh!\nSomething went wrong' }
      })
    }
  }

  const hideReviews = () => {
    dispatch({ type: ActionType.HIDE_REVIEWS })
  }

  const setSearchMode = () => {
    dispatch({ type: ActionType.SET_SEARCH_MODE })
  }

  const setSearchResults = (movies: Movie[] | [] | 'none') => {
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
        clearAlert,
        changeTheme,
        getNowPlaying,
        changeModeNowPlaying,
        getMovieDetails,
        getReviews,
        hideReviews,
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
