import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { CardComponent } from '@app/components/Card'
import { ReplayIcon } from '@app/components/icons/Replay'
import { Pile } from '@app/components/Pile'
import { Player } from '@app/components/Player'
import { SuitIcon } from '@app/components/SuitIcon'
import { CARDS_IN_HAND } from '@app/constants'
import { Player as PlayerType } from '@app/features/players/playersSlice'
import { useDeck } from '@app/hooks/useDeck'
import { useGame } from '@app/hooks/useGame'
import { usePlayers } from '@app/hooks/usePlayers'
import { CardsValue } from '@app/types/common.types'
import { fetchCards } from '@app/utils/fetchers/fetchCards'

export const Game = () => {
  const [winner, setWinner] = useState<PlayerType | null>(null)
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

                <NewGameButton onClick={() => console.log('WIN')}>
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

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .ant-form label {
    font-size: 16px;
    line-height: 22px;
  }
`

const Table = styled.div`
  position: relative;
  width: 1000px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 25px 75px 25px 45px;
  background-color: #35654d;
  border: 30px solid #394b41;
  box-sizing: border-box;
  border-radius: 100px;
`

const TableCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-75%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Notification = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  color: #f1fcf6;
  font-size: 24px;
`

const GameInfo = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  color: #f1fcf6;
  font-weight: bold;
`

const SuitIconWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: -45px;
  left: 50%;
  transform: translateX(-25%);
  white-space: nowrap;
  color: #f1fcf6;
  font-weight: bold;

  svg {
    margin-left: 8px;
  }
`

const OpponentsSide = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`

const Result = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ResultMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-bottom: 8px;
  font-weight: bold;
  color: #f1fcf6;
`

const NewGameButton = styled.button`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #d2e4d6;
  background: #575593;
  border: 2px solid #f1fcf6;
  border-radius: 10px;
  color: #f1fcf6;
  font-weight: bold;
  cursor: pointer;
`

const NextRound = styled.button`
  position: absolute;
  z-index: 10;
  left: 35px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #d2e4d6;
  background: #575593;
  border: 2px solid #f1fcf6;
  border-radius: 10px;
  color: #f1fcf6;
  font-weight: bold;
  cursor: pointer;

  svg {
    width: 40px;
    height: 40px;
    margin-right: 8px;
    fill: #eee683;
  }
`

const LinkBack = styled(Link)`
  position: absolute;
  left: 25px;
  top: 25px;
  background: transparent;
  color: #276180;
  border: 0;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: #00c1ff;
  }
`
