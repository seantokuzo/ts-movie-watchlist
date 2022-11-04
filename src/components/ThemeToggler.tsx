import React from 'react'
import { useAppContext } from '../context/appContext'

const ThemeToggler: React.FC = () => {
  const { darkMode, changeTheme } = useAppContext()

  return (
    <label
      htmlFor="default-toggle"
      className="inline-flex relative items-center cursor-pointer self-end"
    >
      <input
        type="checkbox"
        onChange={changeTheme}
        checked={darkMode}
        value=""
        id="default-toggle"
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-blue-400 peer-focus:outline-none rounded-full peer dark:bg-blue-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:border-2 peer-checked:border-zinc-600 peer-checked:bg-zinc-600"></div>
    </label>
  )
}

export default ThemeToggler
