import { Card, Suit } from '@app/types/common.types'

export const checkCardRules = (
  currentCard: Card,
  pileCard: Card,
  activeSuit: Suit | null
): boolean => {
  const currentSuit = activeSuit || pileCard.suit

  return (
    currentCard.value === pileCard.value ||
    currentCard.suit === currentSuit ||
    currentCard.value === 'QUEEN'
  )
}
