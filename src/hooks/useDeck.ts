import { useDispatch, useSelector } from 'react-redux'
import { PayloadAction } from '@reduxjs/toolkit'

import {
  deckActions,
  getNewDeck,
  selectDeck,
  takeInitialCards,
} from '@app/features/deck/deckSlice'
import { Card } from '@app/types/common.types'

export const useDeck = () => {
  const dispatch = useDispatch()

  const {
    updatePile,
    updateRemaining,
    setSuit,
    setAlreadyTookTheCard,
  } = deckActions

  const {
    deckId,
    remaining,
    status,
    cardsInGame,
    pile,
    error,
    activeSuit,
    alreadyTookTheCard,
  } = useSelector(selectDeck)

  return {
    deckId,
    remaining,
    status,
    cardsInGame,
    pile,
    activeSuit,
    error,
    alreadyTookTheCard,
    takeInitialCards: (e: number) => dispatch(takeInitialCards(e)),
    getNewDeck: () => dispatch(getNewDeck()),
    updatePile: (e: Card[]) => dispatch(updatePile(e)),
    updateRemaining: (e: PayloadAction) => dispatch(updateRemaining(e)),
    setSuit: (e: PayloadAction | null) => dispatch(setSuit(e)),
    setAlreadyTookTheCard: (e: boolean) => dispatch(setAlreadyTookTheCard(e)),
  }
}
