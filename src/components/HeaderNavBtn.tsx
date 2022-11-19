import { useAppContext } from '../context/appContext'
import { AppMode } from '../context/appContext'

const HeaderNavBtn: React.FC<{ btnType: AppMode }> = ({ btnType }) => {
  const { mode, darkMode, setModeNowPlaying, setModeSearch, setModeWatchlist } =
    useAppContext()

  const isBtnSelected = (modeBtn: AppMode) => {
    if (mode === modeBtn) {
      if (darkMode) return 'bg-zinc-300 text-black'
      return 'bg-blue-300'
    }
    return 'bg-none text-white'
  }

  const handleClick = () => {
    if (btnType === 'now-playing') {
      return setModeNowPlaying()
    }
    if (btnType === 'search') {
      return setModeSearch()
    }
    if (btnType === 'watchlist') {
      return setModeWatchlist()
    }
  }

  const btnTypeToText = btnType
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <button
      className={`mx-1 lg:my-2 border-2 rounded-l-full rounded-r-full hover:scale-105
        ${darkMode ? 'border-zinc-300' : 'border-blue-300'}
        px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-3
        text-lg sm:text-xl md:text-2xl lg:text-3xl
        ${isBtnSelected(btnType)}`}
      onClick={handleClick}
    >
      {btnTypeToText}
    </button>
  )
}

export default HeaderNavBtn
