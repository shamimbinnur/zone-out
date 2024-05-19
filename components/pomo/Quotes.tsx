"use client"

import { QuotesType } from '@/data/pomo/quote'
import { FC, useEffect, useState } from 'react'

interface QuoteProps {
  quotes: QuotesType
}

const Quotes:FC <QuoteProps> = ({
  quotes
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0)

  // Get random quote index
  const getRandomQuoteIndex = () => {
    const previousIndex = quoteIndex
    let index = Math.floor(Math.random() * quotes.length)

    while (index === previousIndex) {
      index = Math.floor(Math.random() * quotes.length)
    }
    
    return index
  }

  // Initialize random quote
  useEffect(() => {
    const index = getRandomQuoteIndex()
    setQuoteIndex(index)
  }, [])
  
  // Automatically change quotes every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const index = getRandomQuoteIndex()
      setQuoteIndex(index)
    }, 60000)
    return () => clearInterval(interval)
  }, [quoteIndex])

  return (
    <div className="h-[60px] flex items-center justify-center max-w-52 sm:max-w-max sm:pr-4">
      <p className="text-moonlit-silver text-center leading-tight text-sm sm:text-md md:text-lg font-archivo ">
        {quotes[quoteIndex].text}
      </p>
    </div>
  )
}

export default Quotes