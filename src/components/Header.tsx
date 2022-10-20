import React from 'react'
import { useAppContext } from '../context/appContext'

const Header: React.FC = () => {
  const { getNowPlaying } = useAppContext()
  return (
    <header className="w-screen bg-blue-500 py-8 px-3">
      <h1 className="text-6xl font-bold text-center text-gray-100">
        Movie Mania
      </h1>
      <div className="w-full py-2 px-3 flex flex-row flex-wrap content-center items-start">
        <div
          className="mx-1 px-4 py-1.5 border-blue-300 border-2 rounded-l-full rounded-r-full"
          onClick={getNowPlaying}
        >
          <p className="text-lg">Now Playing</p>
        </div>
        <div
          className="mx-1 px-4 py-1.5 border-blue-300 border-2 rounded-l-full rounded-r-full"
          onClick={getNowPlaying}
        >
          <p className="text-lg flex flex-row content-center items-center">
            Search
            <i className="fa-solid fa-magnifying-glass ml-2 text-sm"></i>
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header
