import axios from 'axios'

export const fetchCards = (deckId: string, cardsAmount: number) =>
  axios(
    `${process.env.REACT_APP_API_URL}/deck/${deckId}/draw/?count=${cardsAmount}`
  )
