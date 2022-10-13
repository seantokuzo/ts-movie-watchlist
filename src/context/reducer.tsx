import { FAKE_ACTION } from './actions'
import { initialState, StateInterface } from './appContext'

type Action = { type: string; payload?: object }

const reducer = (state: StateInterface, action: Action) => {
  if (action.type === FAKE_ACTION) {
    return {
      ...state,
      mode: state.mode === 'home' ? 'fake' : initialState.mode
    }
  }

  throw new Error(`No such action: ${action.type}`)
}

export default reducer
