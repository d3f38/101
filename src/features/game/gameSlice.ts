import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@app/app/rootReducer'

interface GameState {
  round: number
  isPlaying: boolean
  gameOver: boolean
  newGame: boolean
}

const initialState: GameState = {
  round: 1,
  isPlaying: true,
  gameOver: false,
  newGame: true,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    nextRound: (state) => {
      state.round += 1
      state.gameOver = false
      state.newGame = true
      state.isPlaying = true
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
    },
  },
})

// Selectors
export const selectGame = (state: RootState) => state.game

export const gameActions = gameSlice.actions

export default gameSlice.reducer