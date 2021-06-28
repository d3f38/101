import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  selectDeck,
  setSuit,
  updatePile,
  updateRemaining,
} from '@app/features/deck/deckSlice'
import {
  nextStep,
  Player as PlayerType,
  selectAllPlayers,
  takeСards,
  updatePlayerCards,
} from '@app/features/players/playersSlice'
import { Card, PenaltyCards, Suits } from '@app/types/common.types'
import { checkCardRules } from '@app/utils/checkCardRules'
import { checkNextStep } from '@app/utils/checkNextStep'
import { fetchCards } from '@app/utils/fetchers/fetchCards'
import { getCardConditions } from '@app/utils/getCardConditions'
import { getNextPlayerId } from '@app/utils/getNextPlayerId'
import { notify } from '@app/utils/notify'

import { CardComponent } from '../Card'

export const Player: FC<{
  data: PlayerType
}> = ({ data }) => {
  const dispatch = useDispatch()
  const { deckId, pile, activeSuit } = useSelector(selectDeck)
  const players = useSelector(selectAllPlayers)

  const lastPileCard = pile[pile.length - 1]
  const { id, isActive, cards } = data

  const [isShownSuitSelect, setIsShownSuitSelect] = useState(false)
  const [isCoveredSix, setIsCoveredSix] = useState(true)
  const [hasNextStep, setHasNextStep] = useState(
    checkNextStep(cards, lastPileCard, activeSuit)
  )

  const sendToNextStep = (id: number, skip = false) =>
    dispatch(
      nextStep({
        id,
        skip,
      })
    )

  const getCards = async (id: number, amountCards: number) => {
    if (deckId) {
      const response = await fetchCards(deckId, amountCards)

      dispatch(updateRemaining(response.data.remaining))
      dispatch(takeСards({ id, cards: response.data.cards }))
    }
  }

  const handleClick = (card: Card) => {
    const isMatchRules = checkCardRules(card, lastPileCard, activeSuit)

    if (isMatchRules) {
      dispatch(setSuit(null))
      dispatch(updatePile([...pile, card]))
      dispatch(
        updatePlayerCards({
          id,
          cards: cards.filter((item) => item.code !== card.code),
        })
      )

      const nextPlayerId = getNextPlayerId(id, players.length)
      const cardConditions = getCardConditions(card, lastPileCard)

      if (cardConditions.isAce) {
        sendToNextStep(id, true)
      } else if (cardConditions.isSpadesKing) {
        getCards(nextPlayerId, PenaltyCards.KING_SPADES)
        sendToNextStep(id, true)
      } else if (cardConditions.isSpadesSeven) {
        getCards(nextPlayerId, PenaltyCards.SEVEN_SPADES)
        sendToNextStep(id, true)
      } else if (cardConditions.isSeven) {
        getCards(nextPlayerId, PenaltyCards.SEVEN)
        sendToNextStep(id, true)
      } else if (cardConditions.isSix) {
        setIsCoveredSix(false)
      } else if (cardConditions.isQueen) {
        setIsShownSuitSelect(true)
      } else if (isCoveredSix) {
        sendToNextStep(id)
      }

      if (cardConditions.isCovered) {
        setIsCoveredSix(true)

        if (cardConditions.isCardWithoutSkipStep) {
          sendToNextStep(id)
        }
      }
    } else {
      notify('Вы не можете сходить этой картой!')
    }
  }

  useEffect(() => {
    setHasNextStep(checkNextStep(cards, lastPileCard, activeSuit))
  }, [cards, pile, activeSuit])

  return (
    <Container isActive={isActive}>
      <Wrapper>
        {cards &&
          cards.map((item, index) => (
            <CardWrapper left={index * 70} key={item.code}>
              <CardComponent data={item} onClick={() => handleClick(item)} />
            </CardWrapper>
          ))}
      </Wrapper>

      {isActive && <ActiveLabel />}

      {hasNextStep ? (
        <span>next step exist</span>
      ) : (
        <button onClick={() => getCards(id, 1)}>take a card</button>
      )}

      {isShownSuitSelect && (
        <select
          onChange={(e) => {
            dispatch(setSuit(e.target.value))
            setIsShownSuitSelect(false)
            sendToNextStep(id)
          }}
        >
          <option value={Suits.CLUBS}>{Suits.CLUBS}</option>
          <option value={Suits.SPADES}>{Suits.SPADES}</option>
          <option value={Suits.HEARTS}>{Suits.HEARTS}</option>
          <option value={Suits.DIAMONDS}>{Suits.DIAMONDS}</option>
        </select>
      )}
    </Container>
  )
}

const Container = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: ${({ isActive }) => (isActive ? 'all' : 'none')};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const CardWrapper = styled.div<{ left: number }>`
  position: relative;
  left: -${({ left }) => left}px;

  &:hover div {
    transform: translateY(-25px);
  }
`

const ActiveLabel = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: lightgreen;
`
