import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AppContextProvider } from './context/appContext'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
)
