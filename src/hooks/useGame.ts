import { useDispatch, useSelector } from 'react-redux'

import { gameActions, selectGame } from '@app/features/game/gameSlice'

export const useGame = () => {
  const dispatch = useDispatch()

  const {
    nextRound,
    continueGame,
    pauseGame,
    startGame,
    finishGame,
  } = gameActions

  const { gameOver, isPlaying, round } = useSelector(selectGame)

  return {
    round,
    gameOver,
    isPlaying,
    nextRound: () => dispatch(nextRound()),
    continueGame: () => dispatch(continueGame()),
    pauseGame: () => dispatch(pauseGame()),
    startGame: () => dispatch(startGame()),
    finishGame: () => dispatch(finishGame()),
  }
}
