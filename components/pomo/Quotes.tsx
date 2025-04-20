"use client";

import { QuotesType } from "@/data/pomo/quote";
import { FC, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface QuoteProps {
  quotes: QuotesType;
}

const Quotes: FC<QuoteProps> = ({ quotes }) => {
  const { theme } = useTheme();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  // Store the previous index to avoid repetition
  const previousIndexRef = useRef(0);
  // Interval reference for cleanup
  const intervalRef = useRef<NodeJS.Timeout>();

  // Get random quote index, ensuring it's different from the current one
  const getRandomQuoteIndex = () => {
    const currentQuotes = quotes || [];
    if (currentQuotes.length <= 1) return 0;

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * currentQuotes.length);
    } while (newIndex === previousIndexRef.current);

    previousIndexRef.current = newIndex;
    return newIndex;
  };

  // Initialize with a random quote on first render
  useEffect(() => {
    if (quotes && quotes.length > 0) {
      setQuoteIndex(getRandomQuoteIndex());
      setIsLoaded(true);
    }

    // Setup interval to change quotes every 60 seconds (not every render)
    intervalRef.current = setInterval(() => {
      setQuoteIndex(getRandomQuoteIndex());
    }, 60000); // 1 minute

    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [quotes]); // Only depend on quotes array, not on quoteIndex

  // Safety check in case quotes array is empty
  if (!quotes || quotes.length === 0) {
    return null;
  }

  const currentQuote = quotes[quoteIndex];

  return (
    <AnimatePresence mode="wait">
      {isLoaded && (
        <motion.div
          key={quoteIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="flex min-h-[32px] items-center justify-center sm:px-4 sm:max-w-max"
        >
          <p
            className={`${theme.textSecondary} text-center leading-tight text-sm sm:text-base font-archivo transition-colors duration-300`}
          >
            {currentQuote.text} -{" "}
            <span className="italic">{currentQuote.author}</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Quotes;
