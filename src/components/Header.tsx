import React from 'react'

const Header: React.FC = () => {
  return (
    <header
      className="container w-full bg-[url('/public/img/header-bg-img.jpg')] bg-left bg-cover bg-no-repeat py-5"
      style={{
        border: '1px solid red'
      }}
    >
      <h1 className="text-4xl text-center text-text-dm">Movie Mania</h1>
    </header>
  )
}

export default Header
