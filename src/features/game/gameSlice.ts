import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@app/app/rootReducer'
import { DEFAULT_PLAYERS } from '@app/constants'

interface GameState {
  round: number
  isPlaying: boolean
  gameOver: boolean
  newGame: boolean
  players: number
}

const initialState: GameState = {
  round: 1,
  isPlaying: true,
  gameOver: false,
  newGame: true,
  players: DEFAULT_PLAYERS,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    nextRound: (state, action) => {
      console.log('🚀 ~ file: gameSlice.ts ~ line 27 ~ action', action)
      state.round += 1
      state.gameOver = false
      state.newGame = true
      state.isPlaying = true
      state.players = action.payload || DEFAULT_PLAYERS
    },
    continueGame: (state) => {
      state.isPlaying = true
    },
    pauseGame: (state) => {
      state.isPlaying = false
    },
    finishGame: (state) => {
      state.gameOver = true
      state.newGame = false
      state.isPlaying = false
    },
    startGame: (state) => {
      state.gameOver = false
      state.newGame = true
      state.isPlaying = true
      state.round = 1
    },
    clearGame: (state) => {
      state.gameOver = false
      state.newGame = true
      state.isPlaying = true
      state.round = 1
    },
    changePlayersAmount(state, action) {
      state.players = action.payload
    },
  },
})

// Selectors
export const selectGame = (state: RootState) => state.game

export const gameActions = gameSlice.actions

export default gameSlice.reducer
