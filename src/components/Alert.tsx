import React from 'react'
import { useAppContext } from '../context/appContext'

const Alert: React.FC = () => {
  const { alertText, alertType } = useAppContext()

  const alertBg = alertType === 'danger' ? 'bg-red-500' : 'bg-green-400'

  return (
    <div
      className={`${alertBg} absolute px-5 py-4 flex justify-center items-center text-center`}
    >
      {alertText}
    </div>
  )
}

export default Alert
