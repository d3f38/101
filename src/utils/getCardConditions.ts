import { Card, CardsValues, Suits } from '@app/types/common.types'

export const getCardConditions = (card: Card, lastPilecard: Card) => ({
  isSix: card.value === CardsValues.SIX,
  isSeven: card.value === CardsValues.SEVEN,
  isAce: card.value === CardsValues.ACE,
  isQueen: card.value === CardsValues.QUEEN,
  isSpadesKing: card.value === CardsValues.KING && card.suit === Suits.SPADES,
  isSpadesSeven: card.suit === Suits.SPADES && card.value === CardsValues.SEVEN,
  isCardWithoutSkipStep:
    card.value !== CardsValues.SEVEN &&
    card.value !== CardsValues.KING &&
    card.value !== CardsValues.ACE,
  isCovered:
    lastPilecard.value === CardsValues.SIX && card.value !== CardsValues.SIX,
})
