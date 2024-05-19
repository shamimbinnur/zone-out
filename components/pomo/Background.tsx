import React, { FC } from 'react'

interface BackgroundProps {
  children: React.ReactNode
}

const Background:FC<BackgroundProps> = ({children}) => {
  return (
    <div className="bg-midnight-moss">
      <div className="xbg-forest bg-cover bg-center">
        {children}
      </div>
    </div>
  )
}

export default Background