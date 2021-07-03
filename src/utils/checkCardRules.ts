import { ActiveSuit, Card } from '@app/types/common.types'

export const checkCardRules = (
  currentCard: Card,
  pileCard: Card,
  activeSuit: ActiveSuit | null
): boolean => {
  const currentSuit = activeSuit || pileCard.suit

  return (
    currentCard.value === pileCard.value ||
    currentCard.suit === currentSuit ||
    currentCard.value === 'QUEEN'
  )
}
