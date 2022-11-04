import React from 'react'
import { nanoid } from 'nanoid'
import { useAppContext } from '../context/appContext'

const Reviews: React.FC = () => {
  const { reviews, hideReviews } = useAppContext()
  return (
    <div className="w-full max-w-3/4 py-3 px-5 relative">
      {reviews.map((review) => {
        return (
          <div className=" mt-2 p-5 border-2 rounded-sm" key={nanoid()}>
            <div className="flex justify-between items-center">
              <h5 className="text-2xl">{review.author}</h5>
              <h5 className="text-xl">{review.date}</h5>
            </div>
            <p className="text-base">{review.review}</p>
          </div>
        )
      })}
      <button
        className="fixed bottom-1 right-1 p-3 rounded-[50%] bg-white/[0.5]"
        onClick={hideReviews}
      >
        Hide
      </button>
    </div>
  )
}

export default Reviews
