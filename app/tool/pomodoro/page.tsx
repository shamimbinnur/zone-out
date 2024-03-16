import Background from '@/components/pomodoro/Background'
import Footer from '@/components/pomodoro/Footer'
import Timer from '@/components/pomodoro/Timer'
import React from 'react'

const Page = () => {
  return (
    <main className="h-screen relative">
      <Background>
        <Timer />
        <Footer />
      </Background>
    </main>
  )
}

export default Page