import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@app/app/rootReducer'
import { CARDS_IN_HAND } from '@app/constants'
import { Cards } from '@app/types/common.types'
import { getNextPlayerId } from '@app/utils/getNextPlayerId'
import { getRandomInt } from '@app/utils/getRandomInt'
import { splitCardsForPlayers } from '@app/utils/splitArrayIntoChunks'

export interface Player {
  id: number
  isOpponent: boolean
  isActive: boolean
  cards: Cards
}

type PlayersState = Player[]

const initialState: PlayersState = []

const handOut = (cardsInGame: Cards): PlayersState => {
  const splittedPlayersCards = splitCardsForPlayers(cardsInGame, CARDS_IN_HAND)

  const distributedCards = splittedPlayersCards.map((item, index) => ({
    id: index,
    isOpponent: index !== 0,
    isActive: false,
    cards: item,
  }))

  distributedCards[getRandomInt(0, distributedCards.length - 1)].isActive = true

  return distributedCards
}

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    handOutCards: (state, action) => handOut(action.payload),
    nextStep: (state, action) => {
      const currentActivePlayer = action.payload.id
      // let nextActivePlayer = currentActivePlayer + 1

      // if (action.payload.skip) {
      //   nextActivePlayer++
      // }

      // if (nextActivePlayer >= state.length) {
      //   nextActivePlayer = nextActivePlayer - state.length
      // }

      const nextActivePlayer = getNextPlayerId(
        currentActivePlayer,
        state.length,
        action.payload.skip
      )

      state[currentActivePlayer].isActive = false
      state[nextActivePlayer].isActive = true
    },
    takeСards: (state, action) => {
      state[action.payload.id].cards = [
        ...state[action.payload.id].cards,
        ...action.payload.cards,
      ]
    },
    updatePlayerCards: (state, action) => {
      state[action.payload.id].cards = action.payload.cards
    },
  },
})

// Selectors
export const selectAllPlayers = (state: RootState) => state.players
export const selectOpponents = (state: RootState) =>
  state.players.filter((item) => item.isOpponent)
export const selectPlayer = (state: RootState) =>
  state.players.find((item) => !item.isOpponent)

export const {
  handOutCards,
  nextStep,
  takeСards,
  updatePlayerCards,
} = playersSlice.actions

export default playersSlice.reducer
