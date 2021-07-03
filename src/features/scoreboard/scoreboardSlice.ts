import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@app/app/rootReducer'

interface ScoreboardState {
  round: number
  points: Record<string, number>
}

const initialState: ScoreboardState = {
  round: 1,
  points: {},
}

export const deckSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    initScoreboard: (state, action: { payload: number }) => {
      state.points = [...Array(action.payload).keys()].reduce(
        (acc, curr, index) => ({ ...acc, [index]: 0 }),
        {}
      )
    },
    addPoints: (state, action: { payload: { id: string; points: number } }) => {
      state.points[action.payload.id] += action.payload.points
    },
    reducePoints: (state, action) => {
      state.points[action.payload.id] -= action.payload.points
    },
  },
})

// Selectors
export const selectScoreboard = (state: RootState) => state.scoreboard
export const selectRound = (state: RootState) => state.scoreboard.round

export const { addPoints, reducePoints, initScoreboard } = deckSlice.actions

export default deckSlice.reducer
