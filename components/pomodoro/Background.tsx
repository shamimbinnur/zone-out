import React, { FC } from 'react'

interface BackgroundProps {
  children: React.ReactNode
}

const Background:FC<BackgroundProps> = ({children}) => {
  return (
    <div className="h-full relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-out-green-800 to-out-green-200">
      <div className="bg-forest bg-cover bg-center h-full ">
        {children}
      </div>
    </div>
  )
}

export default Background