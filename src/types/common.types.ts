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

export type Suit = 'HEARTS' | 'CLUBS' | 'SPADES' | 'DIAMONDS'

export enum Suits {
  HEARTS = 'HEARTS',
  CLUBS = 'CLUBS',
  SPADES = 'SPADES',
  DIAMONDS = 'DIAMONDS',
}

export enum CardsValues {
  SIX = '6',
  SEVEN = '7',
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
  ACE = 'ACE',
}

export enum CardsPoints {
  JACK = 2,
  QUEEN = 3,
  KING = 4,
  ACE = 11,
}

export enum PenaltyCards {
  KING_SPADES = 5,
  SEVEN_SPADES = 4,
  SEVEN = 2,
}
