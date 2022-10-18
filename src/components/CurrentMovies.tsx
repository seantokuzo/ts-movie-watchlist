import React, { useEffect } from 'react'

// const tmdbKey = '3259933c93801a8673fb6333e45681c4'

// const fetchString = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbKey}&primary_release_date.gte=${monthPrior}&primary_release_date.lte=${today}`
const fetchString = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbKey}&now-playing&popularity.gte=3000?language=en-US`

const CurrentMovies: React.FC = () => {
  useEffect(() => {
    fetch(fetchString)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }, [])

  return <div>CurrentMovies</div>
}

export default CurrentMovies
