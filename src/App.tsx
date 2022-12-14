import React from 'react'
import Alert from './components/Alert'
import Header from './components/Header'
import SharedLayout from './components/SharedLayout'
import { useAppContext } from './context/appContext'

function App() {
  const { darkMode, showAlert } = useAppContext()

  const themeBg = darkMode ? 'bg-zinc-700' : 'bg-blue-400'
  const textColor = darkMode ? 'text-white' : 'text-black'

  return (
    <div
      className={`font-serif w-full h-full min-h-screen flex flex-col items-center ${themeBg} ${textColor}`}
    >
      <Header />
      <SharedLayout />
      {showAlert && <Alert />}
    </div>
  )
}

export default App
