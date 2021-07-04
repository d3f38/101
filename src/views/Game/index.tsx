import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { CardComponent } from '@app/components/Card'
import { ReplayIcon } from '@app/components/icons/Replay'
import { Pile } from '@app/components/Pile'
import { Player } from '@app/components/Player'
import { SuitIcon } from '@app/components/SuitIcon'
import { CARDS_IN_HAND } from '@app/constants'
import { selectSettings } from '@app/features/settings/settingsSlice'
import { useDeck } from '@app/hooks/useDeck'
import { useGame } from '@app/hooks/useGame'
import { usePlayers } from '@app/hooks/usePlayers'
import { CardsValue } from '@app/types/common.types'
import { fetchCards } from '@app/utils/fetchers/fetchCards'

export const Game = () => {
  const { playersAmount } = useSelector(selectSettings)

  const { isPlaying, gameOver, nextRound, round } = useGame()
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
    getNewDeck()
  }, [])

  useEffect(() => {
    if (deckId) {
      takeInitialCards(CARDS_IN_HAND * playersAmount)
    }
  }, [deckId, playersAmount])

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

  const startNewRound = () => {
    updatePile([])
    getNewDeck()
    nextRound()
  }

  return (
    <Container>
      <LinkBack to="/">← Back to menu</LinkBack>
      <Table>
        {status !== 'pending' ? (
          <>
            <div>Round: {round}</div>
            {gameOver && <div>Game over!</div>}
            <OpponentsSide>
              {opponents &&
                opponents.map((item) => <Player data={item} key={item.id} />)}
            </OpponentsSide>

            <TableCenter>
              {!isPlaying && !gameOver && (
                <NextRound onClick={startNewRound}>
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
            </TableCenter>

            {activeSuit && <SuitIcon suit={activeSuit} />}

            {mainPlayer && <Player data={mainPlayer} />}
          </>
        ) : (
          <>
            {!error ? (
              <span>LOADING..</span>
            ) : (
              <span>An error has occurred. Please refresh the page!</span>
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
  width: 100%;
  padding: 25px;
  background-color: #35654d;
  border: 30px solid #394b41;
  box-sizing: border-box;
  border-radius: 100px;
`

const TableCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const OpponentsSide = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const NextRound = styled.button`
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
