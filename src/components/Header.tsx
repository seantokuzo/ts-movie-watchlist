import React from 'react'
import { useAppContext } from '../context/appContext'
import HeaderNavBtn from './HeaderNavBtn'
import ThemeToggler from './ThemeToggler'

const Header: React.FC = () => {
  const { darkMode, mode } = useAppContext()

  const bgColor = darkMode ? 'bg-zinc-800' : 'bg-blue-500'

  return (
    <header
      className={`w-full ${bgColor} flex flex-col justify-center items-center pt-3 px-3 ${
        mode === 'search' ? 'pb-8' : 'pb-4'
      }`}
    >
      <div className="fixed top-3 right-1 lg:scale-150 lg:top-10 lg:right-8">
        <ThemeToggler />
      </div>
      <h1 className="mt-10 text-6xl lg:text-8xl font-bold text-center text-gray-100">
        Movie Mania
      </h1>
      <nav className="w-full max-w-2xl py-2 px-3 flex flex-row justify-evenly items-start">
        <HeaderNavBtn btnType="now-playing" />
        <HeaderNavBtn btnType="search" />
        <HeaderNavBtn btnType="watchlist" />
      </nav>
    </header>
  )
}

export default Header
