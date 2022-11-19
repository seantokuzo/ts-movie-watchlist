import { useAppContext } from '../context/appContext'
import NowPlaying from './NowPlaying'
import MovieDetails from './MovieDetails'
import Search from './Search'
import Watchlist from './Watchlist'
import Loading from './Loading'
import Alert from './Alert'

const SharedLayout = () => {
  const { mode, isLoading, showAlert } = useAppContext()

  return (
    <div className="w-full h-full max-w-3xl flex flex-col justify-center items-center">
      {mode === 'now-playing' && <NowPlaying />}
      {mode === 'details' && <MovieDetails />}
      {mode === 'search' && <Search />}
      {mode === 'watchlist' && <Watchlist />}
      {isLoading && <Loading />}
    </div>
  )
}

export default SharedLayout
