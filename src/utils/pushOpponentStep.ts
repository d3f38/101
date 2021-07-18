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
  console.log(
    '🚀 ~ file: pushOpponentStep.ts ~ line 15 ~ cardsAccordingRules',
    cardsAccordingRules
  )
  const nextCardForStep = getRandomInt(0, cardsAccordingRules.length - 1)
  console.log(
    '🚀 ~ file: pushOpponentStep.ts ~ line 20 ~ nextCardForStep',
    nextCardForStep
  )

  return cardsAccordingRules[nextCardForStep]
}
