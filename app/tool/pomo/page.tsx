import Background from '@/components/pomo/Background'
import Footer from '@/components/pomo/Footer'
import Timer from '@/components/pomo/Timer'
import React from 'react'

const Page = () => {
  return (
    <main>
      <Background>
        <Timer />
        <Footer />
      </Background>
    </main>
  )
}

export default Page