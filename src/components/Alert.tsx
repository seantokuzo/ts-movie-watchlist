import React from 'react'
import { useAppContext } from '../context/appContext'

const Alert: React.FC = () => {
  const { alertText, alertType } = useAppContext()

  const alertBg = alertType === 'danger' ? 'bg-red-500' : 'bg-green-400'

  return (
    <div
      className={`${alertBg} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 py-4 flex justify-center items-center text-center rounded-sm shadow-xl`}
    >
      <h5 className="text-2xl">{alertText}</h5>
    </div>
  )
}

export default Alert
