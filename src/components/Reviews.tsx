import React from 'react'
import { nanoid } from 'nanoid'
import { useAppContext } from '../context/appContext'

const Reviews: React.FC = () => {
  const { reviews } = useAppContext()
  return (
    <div className="w-full max-w-xl py-3 px-5 relative">
      {reviews.map((review) => {
        return (
          <div
            className=" mt-3 p-5 border-2 rounded-sm shadow-xl bg-black/[0.5]"
            key={nanoid()}
          >
            <div className="flex justify-between items-center">
              <div className='flex flex-row justify-center items-center'>
                <i className="fa-solid fa-user mr-3"></i>
                <h5 className="text-2xl">{review.author}</h5>
              </div>
              <h5 className="text-xl">{review.date}</h5>
            </div>
            <p className="text-base">{review.review}</p>
          </div>
        )
      })}
      {/* <button
        className="fixed bottom-1 right-1 p-3 rounded-[50%] shadow-xl bg-white/[0.5] hover:bg-orange-300"
        onClick={hideReviews}
      >
        Hide
      </button> */}
    </div>
  )
}

export default Reviews
