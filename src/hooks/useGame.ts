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
    clearGame,
    changePlayersAmount,
  } = gameActions

  const { gameOver, isPlaying, round, players } = useSelector(selectGame)

  return {
    round,
    gameOver,
    isPlaying,
    players,
    nextRound: (playersAmount?: number) => dispatch(nextRound(playersAmount)),
    continueGame: () => dispatch(continueGame()),
    pauseGame: () => dispatch(pauseGame()),
    startGame: () => dispatch(startGame()),
    finishGame: () => dispatch(finishGame()),
    clearGame: () => dispatch(clearGame()),
    changePlayersAmount: (playersAmount: number) =>
      dispatch(changePlayersAmount(playersAmount)),
  }
}
