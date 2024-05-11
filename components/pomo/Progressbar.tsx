import { FC } from 'react'
import { FaCheck } from 'react-icons/fa'

interface ProgressbarProps {
  completed?: number   
}

const Progressbar:FC <ProgressbarProps> = ({
  completed = 0,
}) => {
  return (
    <div className="relative opacity-80 flex justify-center gap-10 items-center">
      {Array.from({ length: 4 }, (_, i) => (
        <Ball key={i} status={i < completed ? 'COMPLETE' : i === completed ? 'ACTIVE' : 'INACTIVE'} />
      ))}
      <div className="w-full h-1 rounded-sm absolute bg-out-green-1000 top-50% left-0"></div>
    </div>
  )
}

export default Progressbar

interface BallProps {
  status?: 'COMPLETE' | 'ACTIVE' | 'INACTIVE'
}
const Ball:FC <BallProps> = ({
  status = 'INACTIVE'
}) => {
  return (
    <div className="z-50 flex items-center justify-center rounded-full">
      {status === 'COMPLETE' && 
      <div className="w-5 h-5 p-1 bg-turquoise-tide flex justify-center items-center rounded-full">
        <FaCheck className="text-moonlit-silver text-md rounded-full" />
      </div>}

      {status === 'ACTIVE' &&
      <div className="w-5 h-5 p-1 bg-turquoise-tide flex justify-center items-center rounded-full">
        <div className="w-full h-full bg-moonlit-silver rounded-full"></div>
      </div>}

      {status === 'INACTIVE' &&
      <div className="w-3 h-3 bg-turquoise-tide flex justify-center items-center rounded-full">
      </div>}
    </div>
  )
}