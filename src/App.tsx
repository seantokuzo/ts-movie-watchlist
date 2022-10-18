import React from 'react'
import Header from './components/Header'
import SharedLayout from './components/SharedLayout'

function App() {
  // useEffect(() => {
  //   if (
  //     localStorage.theme === 'dark' ||
  //     (!('theme' in localStorage) &&
  //       window.matchMedia('(prefers-color-scheme: dark)').matches)
  //   ) {
  //     document.documentElement.classList.add('dark')
  //   } else {
  //     document.documentElement.classList.remove('dark')
  //   }
  // }, [])

  return (
    <div className="font-serif w-screen h-screen bg-blue-400">
      <Header />
      <SharedLayout />
    </div>
  )
}

export default App
