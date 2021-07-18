import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { CardComponent } from '@app/components/Card'
import { ReplayIcon } from '@app/components/icons/Replay'
import { Pile } from '@app/components/Pile'
import { Player } from '@app/components/Player'
import { SuitIcon } from '@app/components/SuitIcon'
import { CARDS_IN_HAND } from '@app/constants'
import { Player as PlayerType } from '@app/features/players/playersSlice'
import { useDeck, useGame, usePlayers } from '@app/hooks'
import { CardsValue } from '@app/types/common.types'
import { fetchCards } from '@app/utils/fetchers/fetchCards'

import {
  Container,
  GameInfo,
  LinkBack,
  NewGameButton,
  NextRound,
  Notification,
  OpponentsSide,
  Result,
  ResultMessage,
  SuitIconWrapper,
  Table,
  TableCenter,
} from './styled'

export const Game = () => {
  const [winner, setWinner] = useState<PlayerType | null>(null)

  const history = useHistory()
  const {
    isPlaying,
    gameOver,
    nextRound,
    round,
    clearGame,
    players,
    finishGame,
  } = useGame()
  const {
    mainPlayer,
    opponents,
    handOutCards,
    takeСards,
    allPlayers,
  } = usePlayers()

  const {
    deckId,
    status,
    cardsInGame,
    pile,
    error,
    activeSuit,
    takeInitialCards,
    getNewDeck,
    updateRemaining,
    setAlreadyTookTheCard,
    updatePile,
  } = useDeck()

  useEffect(() => {
    if (deckId) {
      takeInitialCards(CARDS_IN_HAND * players)
    }
  }, [deckId, players])

  useEffect(() => {
    if (cardsInGame.length) {
      handOutCards(cardsInGame)
    }
  }, [cardsInGame, deckId])

  const activePlayer = allPlayers.find((item) => item.isActive)

  const getAdditionalCard = useCallback(async () => {
    if (deckId && activePlayer && !activePlayer.hasNextStep) {
      const lastPileCard = pile[pile.length - 1]
      const response = await fetchCards(deckId, 1)

      if (lastPileCard.value !== CardsValue.SIX) {
        setAlreadyTookTheCard(true)
      }

      updateRemaining(response.data.remaining)
      takeСards(activePlayer.id, response.data.cards)
    }
  }, [deckId, activePlayer, pile])

  const startNewRound = (players?: number) => {
    updatePile([])
    getNewDeck()
    nextRound(players)
  }

  useEffect(() => {
    if (players === 1) {
      finishGame()
      setWinner(allPlayers[0])
    }
  }, [players, allPlayers])

  return (
    <Container>
      <LinkBack to="/" onClick={clearGame}>
        ← Back to menu
      </LinkBack>
      <Table>
        {status !== 'pending' ? (
          <>
            <GameInfo>
              <div>Round: {round}</div>
              {gameOver && <div>Game over!</div>}
            </GameInfo>

            <OpponentsSide>
              {opponents &&
                opponents.map((item) => <Player data={item} key={item.id} />)}
            </OpponentsSide>

            {winner ? (
              <Result>
                <ResultMessage>Player {winner.id} is winner!</ResultMessage>

                <NewGameButton onClick={() => history.push('/')}>
                  New game!
                </NewGameButton>
              </Result>
            ) : (
              <TableCenter>
                {!isPlaying && !gameOver && (
                  <NextRound onClick={() => startNewRound(allPlayers.length)}>
                    <ReplayIcon />
                    Next round!
                  </NextRound>
                )}
                <CardComponent
                  onClick={getAdditionalCard}
                  isActive={
                    activePlayer && !activePlayer.hasNextStep && !gameOver
                  }
                />
                <Pile cards={pile} />

                {activeSuit && (
                  <SuitIconWrapper>
                    Current suit: <SuitIcon suit={activeSuit} />
                  </SuitIconWrapper>
                )}
              </TableCenter>
            )}
            {mainPlayer && !gameOver && <Player data={mainPlayer} />}
          </>
        ) : (
          <>
            {!error ? (
              <Notification>LOADING..</Notification>
            ) : (
              <Notification>
                An error has occurred. Please refresh the page!
              </Notification>
            )}
          </>
        )}
      </Table>
    </Container>
  )
}
