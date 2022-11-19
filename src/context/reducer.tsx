import { ActionType } from './actions'
import { StateInterface, blankMovieObj } from './appContext'
import { Movie, Review } from '../util/convertTmdbData'
import { AlertType } from './appContext'

type Action =
  | {
      type: ActionType.SHOW_ALERT
      payload: { alertType: AlertType; msg: string }
    }
  | { type: ActionType.CLEAR_ALERT }
  | { type: ActionType.GET_NOW_PLAYING_BEGIN }
  | { type: ActionType.GET_NOW_PLAYING_SUCCESS; payload: { movies: Movie[] } }
  | { type: ActionType.SET_MOVIES_SUCCESS; payload: { movies: Movie[] } }
  | { type: ActionType.SET_MOVIES_ERROR; payload: { msg: string } }
  | { type: ActionType.MODE_NOW_PLAYING }
  | { type: ActionType.SET_DETAILS; payload: { selectedMovie: Movie } }
  | { type: ActionType.GET_REVIEWS_BEGIN }
  | {
      type: ActionType.GET_REVIEWS_SUCCESS
      payload: { reviews: Review[] | [] }
    }
  | { type: ActionType.HIDE_REVIEWS }
  | { type: ActionType.SET_SEARCH_MODE }
  | {
      type: ActionType.SET_SEARCH_RESULTS
      payload: { movies: Movie[] | [] | 'none' }
    }
  | { type: ActionType.SET_WATCHLIST_MODE }
  | {
      type: ActionType.ADD_TO_WATCHLIST
      payload: { updatedWatchlist: Movie[] }
    }
  | {
      type: ActionType.REMOVE_FROM_WATCHLIST
      payload: { updatedWatchlist: Movie[] | [] }
    }
  | { type: ActionType.CHANGE_THEME }

const reducer = (state: StateInterface, action: Action): StateInterface => {
  switch (action.type) {
    case ActionType.SHOW_ALERT:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: action.payload.alertType,
        alertText: action.payload.msg
      }
    case ActionType.CLEAR_ALERT:
      return {
        ...state,
        isLoading: false,
        showAlert: false,
        alertType: '',
        alertText: ''
      }
    case ActionType.CHANGE_THEME:
      return {
        ...state,
        darkMode: !state.darkMode
      }
    case ActionType.GET_NOW_PLAYING_BEGIN:
      return {
        ...state,
        isLoading: true
      }
    case ActionType.GET_NOW_PLAYING_SUCCESS:
      return {
        ...state,
        movies: action.payload.movies,
        isLoading: false
      }
    case ActionType.SET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload.movies
      }
    case ActionType.SET_MOVIES_ERROR:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg
      }
    case ActionType.MODE_NOW_PLAYING:
      return {
        ...state,
        mode: 'now-playing',
        details: { ...blankMovieObj }
        // searchResults: []
      }
    case ActionType.SET_DETAILS:
      return {
        ...state,
        mode: 'details',
        details: action.payload.selectedMovie
      }
    case ActionType.GET_REVIEWS_BEGIN:
      return {
        ...state,
        isLoading: true
      }
    case ActionType.GET_REVIEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reviews: action.payload.reviews,
        showReviews: true
      }
    case ActionType.HIDE_REVIEWS:
      return {
        ...state,
        reviews: [],
        showReviews: false
      }
    case ActionType.SET_SEARCH_MODE:
      return {
        ...state,
        mode: 'search'
        // searchResults: []
      }
    case ActionType.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload.movies
      }
    case ActionType.SET_WATCHLIST_MODE:
      return {
        ...state,
        mode: 'watchlist'
        // searchResults: []
      }
    case ActionType.ADD_TO_WATCHLIST:
      return {
        ...state,
        watchlist: action.payload.updatedWatchlist
      }
    case ActionType.REMOVE_FROM_WATCHLIST: {
      return {
        ...state,
        watchlist: action.payload.updatedWatchlist
      }
    }
    default:
      throw new Error(`No such action: ${action}`)
  }
}

export default reducer
