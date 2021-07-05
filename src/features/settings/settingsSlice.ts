import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@app/app/rootReducer'
import { DEFAULT_PLAYERS } from '@app/constants'

interface SettingsState {
  playersAmount: number
}

const initialState: SettingsState = {
  playersAmount: DEFAULT_PLAYERS,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changePlayersAmount(state, action) {
      state.playersAmount = action.payload
    },
  },
})

// Selectors
export const selectSettings = (state: RootState) => state.settings

export const { changePlayersAmount } = settingsSlice.actions

export default settingsSlice.reducer
