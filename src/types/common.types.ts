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

export type ActiveSuit = 'HEARTS' | 'CLUBS' | 'SPADES' | 'DIAMONDS'

export enum Suit {
  HEARTS = 'HEARTS',
  CLUBS = 'CLUBS',
  SPADES = 'SPADES',
  DIAMONDS = 'DIAMONDS',
}

export enum CardsValue {
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
  ACE = 'ACE',
}

export enum CardsPoint {
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 0,
  TEN = 10,
  JACK = 2,
  QUEEN = 3,
  KING = 4,
  ACE = 11,
}

export enum PenaltyCard {
  KING_SPADES = 5,
  SEVEN_SPADES = 4,
  SEVEN = 2,
}
