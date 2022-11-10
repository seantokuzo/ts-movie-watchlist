import React from 'react'
import { useAppContext } from '../context/appContext'
import ThemeToggler from './ThemeToggler'

const Header: React.FC = () => {
  const {
    darkMode,
    mode,
    changeModeNowPlaying,
    setSearchMode,
    setWatchlistMode
  } = useAppContext()

  const headerBtnColor = darkMode ? 'border-zinc-300' : 'border-blue-300'

  const headerBtnClasses = `mx-1 px-4 py-1.5 ${headerBtnColor} border-2 rounded-l-full rounded-r-full`

  const selectedClass = (modeBtn: string) => {
    if (mode === modeBtn) {
      if (darkMode) return 'bg-zinc-300 text-black'
      return 'bg-blue-300'
    }
    return 'bg-none'
  }

  const bgColor = darkMode ? 'bg-zinc-800' : 'bg-blue-500'

  return (
    <header
      className={`w-full ${bgColor} flex flex-col justify-center items-center pt-3 px-3 ${
        mode === 'search' ? 'pb-8' : 'pb-4'
      }`}
    >
      <ThemeToggler />
      <h1 className="mt-2 text-6xl font-bold text-center text-gray-100">
        Movie Mania
      </h1>
      <div className="w-full py-2 px-3 flex flex-row flex-wrap justify-center items-start">
        <button
          className={`${headerBtnClasses} ${selectedClass('home')}`}
          onClick={changeModeNowPlaying}
        >
          <p className="text-lg">Now Playing</p>
        </button>
        <button
          className={`${headerBtnClasses} ${selectedClass('search')}`}
          onClick={setSearchMode}
        >
          <p className="text-lg flex flex-row content-center items-center">
            Search
            <i className="fa-solid fa-magnifying-glass ml-2 text-sm"></i>
          </p>
        </button>
        <button
          className={`${headerBtnClasses} ${selectedClass('watchlist')}`}
          onClick={setWatchlistMode}
        >
          <p className="text-lg flex flex-row content-center items-center">
            My Watchlist
          </p>
        </button>
      </div>
    </header>
  )
}

export default Header
