import { combineReducers } from '@reduxjs/toolkit'

// Reducers
import deckReducer from '@app/features/deck/deckSlice'
import playersSlice from '@app/features/players/playersSlice'
import settingsSlice from '@app/features/settings/settingsSlice'

const rootReducer = combineReducers({
  deck: deckReducer,
  settings: settingsSlice,
  players: playersSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
