import { Card } from '@app/types/common.types'

export const chackCardRules = (currentCard: Card, pileCard: Card): boolean =>
  currentCard.value === pileCard.value ||
  currentCard.suit === pileCard.suit ||
  currentCard.value === 'QUEEN'
