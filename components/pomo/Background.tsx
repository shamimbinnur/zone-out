import React, { FC } from 'react'

interface BackgroundProps {
  children: React.ReactNode
}

const Background:FC<BackgroundProps> = ({children}) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-out-green-800 to-out-green-200">
      <div className="xbg-forest bg-cover bg-center h-full ">
        {children}
      </div>
    </div>
  )
}

export default Background