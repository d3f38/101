import { combineReducers } from '@reduxjs/toolkit'

// Reducers
import deckSlice from '@app/features/deck/deckSlice'
import gameSlice from '@app/features/game/gameSlice'
import playersSlice from '@app/features/players/playersSlice'
import settingsSlice from '@app/features/settings/settingsSlice'

const rootReducer = combineReducers({
  deck: deckSlice,
  settings: settingsSlice,
  players: playersSlice,
  game: gameSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
