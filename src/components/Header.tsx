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
      <ThemeToggler />
      <h1 className="mt-2 text-6xl font-bold text-center text-gray-100">
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
