import { ActiveSuit, Card, Cards } from '@app/types/common.types'

import { checkCardRules } from './checkCardRules'

export const checkNextStep = (
  cards: Cards,
  pileCard: Card,
  activeSuit: ActiveSuit | null
) => cards.some((item) => checkCardRules(item, pileCard, activeSuit))
