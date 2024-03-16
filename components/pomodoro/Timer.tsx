import React from 'react'

const Timer = () => {
  return (
    <section className="flex flex-col gap-y-16 justify-center items-center pt-[200px]">
      <p className=" text-out-green-200"> <span className="text-3xl font-bold">+0 </span> <span className="text-2xl">pomodoro</span></p>

      <div className="w-[660px] h-[300px] flex justify-center rounded-[52px] relative">
        <div className="h-full w-full rounded-[52px] absolute top-0 opacity-25 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-out-green-600 border border-out-green-200 to-out-green-400 drop-shadow-md "></div>
        
        <div className="flex relative items-center">
          <div className="flex gap-8 justify-start items-center">
            <div>
              <p className="text-[182px] font-medium text-white">25</p>
            </div>
            
            <div className="bg-out-green-200 h-[120px] rounded-sm w-[4px]">
            </div>

            <div>
            <p className="text-[182px] font-medium text-white">00</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-out-green-1000 text-base font-bold text-out-green-200 h-14 flex items-center justify-center gap-x-7 px-7 rounded-[52px]">
          <button>Long Break</button>
          <button className="text-3xl ">Start</button>
          <button>Short Break</button>
        </div>
      </div>
    </section>
  )
}

export default Timer