import React, { useReducer, useContext } from 'react'
import { FAKE_ACTION } from './actions'
import reducer from './reducer'

export interface StateInterface {
  mode: string
}

const initialState: StateInterface = {
  mode: 'home'
}

export interface AppContextInterface extends StateInterface {
  fakeAction: () => void
}

const AppContext = React.createContext<AppContextInterface | null>(null)

type Props = {
  children: JSX.Element | JSX.Element[]
}

const AppContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fakeAction = () => {
    dispatch({ type: FAKE_ACTION })
    console.log('Fake Action')
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        fakeAction
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
