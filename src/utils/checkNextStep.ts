import { Card, Cards, Suit } from '@app/types/common.types'

import { checkCardRules } from './checkCardRules'

export const checkNextStep = (
  cards: Cards,
  pileCard: Card,
  activeSuit: Suit | null
) => cards.some((item) => checkCardRules(item, pileCard, activeSuit))
