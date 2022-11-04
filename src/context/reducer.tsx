import { ActionType } from './actions'
import { StateInterface, Movie, blankMovieObj } from './appContext'

type Action =
  | { type: ActionType.SET_MOVIES_SUCCESS; payload: { movies: Movie[] } }
  | { type: ActionType.SET_MOVIES_ERROR; payload: { msg: string } }
  | { type: ActionType.GET_NOW_PLAYING }
  | { type: ActionType.SET_DETAILS; payload: { selectedMovie: Movie } }
  | { type: ActionType.SET_SEARCH_MODE }
  | { type: ActionType.SET_SEARCH_RESULTS; payload: { movies: Movie[] | [] } }
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
  if (action.type === ActionType.CHANGE_THEME) {
    return {
      ...state,
      darkMode: !state.darkMode
    }
  }
  if (action.type === ActionType.SET_MOVIES_SUCCESS) {
    return {
      ...state,
      movies: action.payload.movies
    }
  }
  if (action.type === ActionType.SET_MOVIES_ERROR) {
    return {
      ...state,
      showAlert: true,
      AlertType: 'danger',
      AlertText: action.payload.msg
    }
  }
  if (action.type === ActionType.GET_NOW_PLAYING) {
    return {
      ...state,
      mode: 'home',
      details: { ...blankMovieObj }
    }
  }
  if (action.type === ActionType.SET_DETAILS) {
    return {
      ...state,
      mode: 'details',
      details: action.payload.selectedMovie
    }
  }
  if (action.type === ActionType.SET_SEARCH_MODE) {
    return {
      ...state,
      mode: 'search'
    }
  }
  if (action.type === ActionType.SET_SEARCH_RESULTS) {
    return {
      ...state,
      searchResults: action.payload.movies
    }
  }
  if (action.type === ActionType.SET_WATCHLIST_MODE) {
    return {
      ...state,
      mode: 'watchlist'
    }
  }
  if (action.type === ActionType.ADD_TO_WATCHLIST) {
    return {
      ...state,
      watchlist: action.payload.updatedWatchlist
    }
  }
  if (action.type === ActionType.REMOVE_FROM_WATCHLIST) {
    return {
      ...state,
      watchlist: action.payload.updatedWatchlist
    }
  }

  throw new Error(`No such action: ${action}`)
}

export default reducer
