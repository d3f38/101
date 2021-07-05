import { useDispatch, useSelector } from 'react-redux'

import {
  playersActions,
  selectAllPlayers,
  selectOpponents,
  selectPlayer,
} from '@app/features/players/playersSlice'
import { Cards } from '@app/types/common.types'

export const usePlayers = () => {
  const dispatch = useDispatch()

  const {
    handOutCards,
    nextStep,
    takeСards,
    updatePlayerCards,
    updatePoints,
    setHasNextStep,
  } = playersActions

  const allPlayers = useSelector(selectAllPlayers)
  const opponents = useSelector(selectOpponents)
  const mainPlayer = useSelector(selectPlayer)

  return {
    allPlayers,
    opponents,
    mainPlayer,
    handOutCards: (e: Cards) => dispatch(handOutCards(e)),
    nextStep: (id: number, skip: boolean) => dispatch(nextStep({ id, skip })),
    takeСards: (id: number, cards: Cards) => dispatch(takeСards({ id, cards })),
    updatePlayerCards: (id: number, cards: Cards) =>
      dispatch(updatePlayerCards({ id, cards })),
    updatePoints: (id: number, points: number) =>
      dispatch(updatePoints({ id, points })),
    setHasNextStep: (id: number, hasNextStep: boolean) =>
      dispatch(setHasNextStep({ id, hasNextStep })),
  }
}
