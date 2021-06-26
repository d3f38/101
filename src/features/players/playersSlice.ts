import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@app/app/rootReducer'
import { CARDS_IN_HAND } from '@app/constants'
import { Cards } from '@app/types/common.types'
import { splitCardsForPlayers } from '@app/utils/splitArrayIntoChunks'

interface Player {
  id: number
  isOpponent: boolean
  isActive: boolean
  playerCards: Cards
}

type PlayersState = Player[]

const initialState: PlayersState = []

const handOut = (cardsInGame: Cards): PlayersState => {
  const splittedPlayersCards = splitCardsForPlayers(cardsInGame, CARDS_IN_HAND)

  const distributedCards = splittedPlayersCards.reduce(
    (acc: PlayersState, curr: Cards, index) => {
      const isActive = Math.random() > 0.5 ? true : false

      if (index === 0) {
        acc.push({
          id: index + 1,
          isOpponent: false,
          isActive,
          playerCards: curr,
        })
      } else {
        acc.push({
          id: index + 1,
          isOpponent: true,
          isActive: !isActive,
          playerCards: curr,
        })
      }

      return acc
    },
    []
  )

  return distributedCards
}

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    handOutCards: (state, action) => handOut(action.payload),
  },
})

// Selectors
export const selectAllPlayers = (state: RootState) => state.players
export const selectOpponents = (state: RootState) =>
  state.players.filter((item) => item.isOpponent)
export const selectPlayer = (state: RootState) =>
  state.players.find((item) => !item.isOpponent)

export const { handOutCards } = playersSlice.actions

export default playersSlice.reducer
