import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div
        className={`w-40 h-40 mt-20 flex flex-col justify-center items-center border-4 border-white/[0.65] border-t-green-500 rounded-[50%] animate-loadspin`}
      >
        <img
          src="./img/the_dude.png"
          alt="The Dude"
          className="animate-revspin w-3/4 mb-1"
        />
      </div>
      <h3 className="mt-3 text-3xl animate-bounce">Loading</h3>
    </div>
  )
}

export default Loading
