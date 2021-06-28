import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { CardComponent } from '@app/components/Card'
import { Pile } from '@app/components/Pile'
import { Player } from '@app/components/Player'
import { CARDS_IN_HAND } from '@app/constants'
import {
  getNewDeck,
  selectDeck,
  takeInitialCards,
} from '@app/features/deck/deckSlice'
import {
  handOutCards,
  selectOpponents,
  selectPlayer,
} from '@app/features/players/playersSlice'
import { selectSettings } from '@app/features/settings/settingsSlice'

export const Game = () => {
  const dispatch = useDispatch()
  const { deckId, status, cardsInGame, pile, error, activeSuit } = useSelector(
    selectDeck
  )
  const { playersAmount } = useSelector(selectSettings)
  const opponentsCards = useSelector(selectOpponents)
  const mainPlayer = useSelector(selectPlayer)

  useEffect(() => {
    dispatch(getNewDeck())
  }, [dispatch])

  useEffect(() => {
    if (deckId) {
      dispatch(takeInitialCards(CARDS_IN_HAND * playersAmount + 1))
    }
  }, [deckId, playersAmount])

  useEffect(() => {
    if (cardsInGame.length) {
      dispatch(handOutCards(cardsInGame))
    }
  }, [cardsInGame, deckId])

  return status !== 'pending' ? (
    <Container>
      <Table>
        <OpponentsSide>
          {opponentsCards &&
            opponentsCards.map((item) => <Player data={item} key={item.id} />)}
        </OpponentsSide>

        <PlayerField>
          <CardComponent />
          <Pile cards={pile} />
        </PlayerField>
        <div>{activeSuit}</div>

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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-top: 60px;

  .ant-form label {
    font-size: 16px;
    line-height: 22px;
  }
`

const Table = styled.div`
  width: 100%;
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
