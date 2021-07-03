import { combineReducers } from '@reduxjs/toolkit'

// Reducers
import deckSlice from '@app/features/deck/deckSlice'
import playersSlice from '@app/features/players/playersSlice'
import scoreboardSlice from '@app/features/scoreboard/scoreboardSlice'
import settingsSlice from '@app/features/settings/settingsSlice'

const rootReducer = combineReducers({
  deck: deckSlice,
  settings: settingsSlice,
  players: playersSlice,
  scoreboard: scoreboardSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
