import { ActiveSuit, Card, Cards } from '@app/types/common.types'

import { checkCardRules } from './checkCardRules'
import { getRandomInt } from './getRandomInt'

export const pushOpponentStep = (
  cards: Cards,
  pileCard: Card,
  activeSuit: ActiveSuit | null
): Card => {
  const cardsAccordingRules = cards.filter(
    (item) => checkCardRules(item, pileCard, activeSuit),
    activeSuit
  )

  const nextCardForStep = getRandomInt(0, cardsAccordingRules.length - 1)
  console.log(
    '🚀 ~  nextCardForStep',
    nextCardForStep,
    ' => ',
    cardsAccordingRules[nextCardForStep]
  )

  return cardsAccordingRules[nextCardForStep]
}
