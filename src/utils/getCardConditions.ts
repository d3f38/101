import { Card, CardsValue, Suit } from '@app/types/common.types'

export const getCardConditions = (card: Card, lastPilecard: Card) => ({
  isSix: card.value === CardsValue.SIX,
  isSeven: card.value === CardsValue.SEVEN,
  isAce: card.value === CardsValue.ACE,
  isQueen: card.value === CardsValue.QUEEN,
  isSpadesKing: card.value === CardsValue.KING && card.suit === Suit.SPADES,
  isSpadesSeven: card.suit === Suit.SPADES && card.value === CardsValue.SEVEN,
  isCardWithoutSkipStep:
    card.value !== CardsValue.SEVEN &&
    card.value !== CardsValue.KING &&
    card.value !== CardsValue.ACE,
  isCovered:
    lastPilecard &&
    lastPilecard.value === CardsValue.SIX &&
    card.value !== CardsValue.SIX,
})
