export type Cards = {
  image: string
  value: string
  suit: string
  code: string
}[]

export type Card = {
  image: string
  value: string
  suit: string
  code: string
}

export interface Deck {
  success: boolean
  deck_id: string
  remaining: number
  shuffled: boolean
}

export interface CardsData {
  success: boolean
  cards: Cards
  deck_id: string
  remaining: number
}
