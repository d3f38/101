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
  points: number
  hasNextStep: boolean
}

type PlayersState = Player[]

const initialState: PlayersState = []

const handOut = (
  cardsInGame: Cards,
  previusState: PlayersState
): PlayersState => {
  const splittedPlayersCards = splitCardsForPlayers(cardsInGame, CARDS_IN_HAND)

  const distributedCards = splittedPlayersCards.map((item, index) => ({
    id: index,
    isOpponent: index !== 0,
    isActive: false,
    cards: item,
    points: (previusState[index] && previusState[index].points) || 0,
    hasNextStep: false,
  }))

  distributedCards[getRandomInt(0, distributedCards.length - 1)].isActive = true

  return distributedCards
}

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    handOutCards: (state, action) => handOut(action.payload, state),
    nextStep: (state, action) => {
      const currentActivePlayer = action.payload.id

      const nextActivePlayer = getNextPlayerId(
        currentActivePlayer,
        state.length,
        action.payload.skip
      )
      console.log(
        '🚀 ~ active players',
        currentActivePlayer,
        '=>',
        nextActivePlayer
      )

      if (state[currentActivePlayer])
        state[currentActivePlayer].isActive = false
      if (state[nextActivePlayer]) state[nextActivePlayer].isActive = true
    },
    takeСards: (state, action) => {
      if (state[action.payload.id])
        state[action.payload.id].cards = [
          ...state[action.payload.id].cards,
          ...action.payload.cards,
        ]
    },
    setHasNextStep: (state, action) => {
      if (state[action.payload.id])
        state[action.payload.id].hasNextStep = action.payload.hasNextStep
    },
    updatePlayerCards: (state, action) => {
      if (state[action.payload.id])
        state[action.payload.id].cards = action.payload.cards
    },
    updatePoints: (state, action) => {
      if (state[action.payload.id])
        state[action.payload.id].points += action.payload.points
    },
    clearPoints: (state) => {
      state.forEach((item) => (item.points = 0))
    },
    kickPlayer: (state, action) => {
      state.splice(action.payload, 1)
    },
  },
})

// Selectors
export const selectAllPlayers = (state: RootState) => state.players
export const selectOpponents = (state: RootState) =>
  state.players.filter((item) => item.isOpponent)
export const selectPlayer = (state: RootState) =>
  state.players.find((item) => !item.isOpponent)

export const playersActions = playersSlice.actions

export default playersSlice.reducer
