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
    }, 15000)
    return () => clearInterval(interval)
  }, [quoteIndex])

  return (
    <div>
      <p className="text-moonlit-silver tracking-tight text-lg font-archivo ">
        {quotes[quoteIndex].text}
      </p>
    </div>
  )
}

export default Quotes