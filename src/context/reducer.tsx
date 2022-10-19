import { ActionType } from './actions'
import { StateInterface, Movie } from './appContext'

type Action =
  | { type: ActionType.SET_MOVIES_SUCCESS; payload: { movies: Movie[] } }
  | { type: ActionType.SET_MOVIES_ERROR; payload: { msg: string } }
  | { type: ActionType.SET_DETAILS; payload: { selectedMovie: Movie } }

const reducer = (state: StateInterface, action: Action): StateInterface => {
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
  if (action.type === ActionType.SET_DETAILS) {
    return {
      ...state,
      mode: 'details',
      details: action.payload.selectedMovie
    }
  }

  throw new Error(`No such action: ${action}`)
}

export default reducer
