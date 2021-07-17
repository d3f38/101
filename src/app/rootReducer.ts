import { combineReducers } from '@reduxjs/toolkit'

// Reducers
import deckSlice from '@app/features/deck/deckSlice'
import gameSlice from '@app/features/game/gameSlice'
import playersSlice from '@app/features/players/playersSlice'

const rootReducer = combineReducers({
  deck: deckSlice,
  players: playersSlice,
  game: gameSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
