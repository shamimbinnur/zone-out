export type QuoteType = {
  text: string,
  author: string
}

export type QuotesType = QuoteType[];

export const quotes: QuotesType  = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker"
  },
  {
    text: "The best preparation for tomorrow is doing your best today.",
    author: "H. Jackson Brown Jr."
  },
]