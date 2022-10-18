import { SET_MOVIES_SUCCESS } from './actions'
import { initialState, StateInterface, Movie } from './appContext'

type Payload = {
  movies?: Movie[]
}

type Action = { type: string; payload: Payload }

const reducer = (state: StateInterface, action: Action) => {
  if (action.type === SET_MOVIES_SUCCESS) {
    return {
      ...state,
      mode: state.mode === 'home' ? 'fake' : initialState.mode
    }
  }
  if (action.type === SET_MOVIES_SUCCESS) {
    return {
      ...state,
      movies: action.payload.movies
    }
  }

  throw new Error(`No such action: ${action.type}`)
}

export default reducer
