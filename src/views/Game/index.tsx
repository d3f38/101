import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { CardComponent } from '@app/components/Card'
import { Pile } from '@app/components/Pile'
import { Player } from '@app/components/Player'
import { SuitIcon } from '@app/components/SuitIcon'
import { CARDS_IN_HAND } from '@app/constants'
import { selectSettings } from '@app/features/settings/settingsSlice'
import { useDeck } from '@app/hooks/useDeck'
import { usePlayers } from '@app/hooks/usePlayers'
import { fetchCards } from '@app/utils/fetchers/fetchCards'

export const Game = () => {
  const { playersAmount } = useSelector(selectSettings)

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
  } = useDeck()

  useEffect(() => {
    getNewDeck()
  }, [])

  useEffect(() => {
    if (deckId) {
      takeInitialCards(CARDS_IN_HAND * playersAmount + 1)
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
      const response = await fetchCards(deckId, 1)

      updateRemaining(response.data.remaining)
      takeСards(activePlayer.id, response.data.cards)
    }
  }, [deckId, activePlayer])

  return status !== 'pending' ? (
    <Container>
      <Table>
        <OpponentsSide>
          {opponents &&
            opponents.map((item) => <Player data={item} key={item.id} />)}
        </OpponentsSide>

        <PlayerField>
          <CardComponent
            onClick={getAdditionalCard}
            isActive={activePlayer && !activePlayer.hasNextStep}
          />
          <Pile cards={pile} />
        </PlayerField>

        {activeSuit && <SuitIcon suit={activeSuit} />}

        {mainPlayer && <Player data={mainPlayer} />}
      </Table>
    </Container>
  ) : (
    <>
      {!error ? (
        <span>LOADING..</span>
      ) : (
        <span>An error has occurred. Please refresh the page!</span>
      )}
    </>
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

const PlayerField = styled.div`
  display: flex;
  justify-content: center;
`

const OpponentsSide = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
