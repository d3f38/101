import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { Player as PlayerType } from '@app/features/players/playersSlice'
import { useDeck } from '@app/hooks/useDeck'
import { useGame } from '@app/hooks/useGame'
import { usePlayers } from '@app/hooks/usePlayers'
import { Card, PenaltyCard } from '@app/types/common.types'
import { calcPoints } from '@app/utils/calcPoints'
import { checkCardRules } from '@app/utils/checkCardRules'
import { checkNextStep } from '@app/utils/checkNextStep'
import { fetchCards } from '@app/utils/fetchers/fetchCards'
import { getCardConditions } from '@app/utils/getCardConditions'
import { getNextPlayerId } from '@app/utils/getNextPlayerId'
import { notify } from '@app/utils/notify'

import { CardComponent } from '../Card'
import { SuitSelect } from '../SuitSelect'

export const Player: FC<{
  data: PlayerType
}> = ({ data }) => {
  const {
    deckId,
    pile,
    activeSuit,
    updatePile,
    updateRemaining,
    setSuit,
    alreadyTookTheCard,
    setAlreadyTookTheCard,
  } = useDeck()

  const {
    nextStep,
    allPlayers,
    takeСards,
    updatePlayerCards,
    setHasNextStep,
    updatePoints,
  } = usePlayers()

  const { pauseGame, finishGame, gameOver } = useGame()

  const lastPileCard = pile[pile.length - 1]
  const { id, isActive, cards, points, isOpponent } = data

  const [isShownSuitSelect, setIsShownSuitSelect] = useState(false)
  const [isCoveredSix, setIsCoveredSix] = useState(true)

  const sendToNextStep = (id: number, skip = false, counter: number) => {
    console.log('🚀 ~  sendToNextStep ~ counter', counter)
    nextStep(id, skip)
  }

  const getCards = async (id: number, amountCards: number) => {
    if (deckId) {
      const response = await fetchCards(deckId, amountCards)

      updateRemaining(response.data.remaining)
      takeСards(id, response.data.cards)
    }
  }

  const handleClick = (card: Card) => {
    const isMatchRules = checkCardRules(card, lastPileCard, activeSuit)

    if (isMatchRules) {
      setSuit(null)
      updatePile([...pile, card])
      updatePlayerCards(
        id,
        cards.filter((item) => item.code !== card.code)
      )

      const nextPlayerId = getNextPlayerId(id, allPlayers.length)
      const cardConditions = getCardConditions(card, lastPileCard)

      if (cardConditions.isAce) {
        sendToNextStep(id, true, 1)
      } else if (cardConditions.isSpadesKing) {
        getCards(nextPlayerId, PenaltyCard.KING_SPADES)
        sendToNextStep(id, true, 2)
      } else if (cardConditions.isSpadesSeven) {
        getCards(nextPlayerId, PenaltyCard.SEVEN_SPADES)
        sendToNextStep(id, true, 3)
      } else if (cardConditions.isSeven) {
        getCards(nextPlayerId, PenaltyCard.SEVEN)
        sendToNextStep(id, true, 4)
      } else if (cardConditions.isSix) {
        setIsCoveredSix(false)
      } else if (cardConditions.isQueen) {
        setIsShownSuitSelect(true)
      } else if (isCoveredSix && !isShownSuitSelect) {
        sendToNextStep(id, false, 5)
      }
      console.log('🚀 ~  isShownSuitSelect', isShownSuitSelect)
      if (cardConditions.isCovered) {
        setIsCoveredSix(true)

        if (cardConditions.isCardWithoutSkipStep && !isShownSuitSelect) {
          sendToNextStep(id, false, 6)
        }
      }
    } else {
      notify(`You can't go with this card!`)
    }
  }

  useEffect(() => {
    if (cards.length) {
      const nextStepExist = checkNextStep(cards, lastPileCard, activeSuit)
      setHasNextStep(id, nextStepExist)

      if (!nextStepExist && alreadyTookTheCard && !isShownSuitSelect) {
        sendToNextStep(id, false, 7)
        setAlreadyTookTheCard(false)
      }
    } else {
      allPlayers.forEach((item) => {
        const roundPoints = calcPoints(item.cards)

        updatePoints(item.id, roundPoints)
        pauseGame()
      })
    }
  }, [cards, pile, activeSuit, isShownSuitSelect])

  useEffect(() => {
    if (points > 25) {
      finishGame()
    }
  }, [points])

  useEffect(() => {
    if (isActive && isOpponent) {
      setTimeout(() => handleClick(cards[0]), 2000)
    }
  }, [])

  return (
    <Container isActive={isActive && !gameOver}>
      <Wrapper>
        {cards &&
          cards.map((item, index) => (
            <CardWrapper left={index} key={item.code}>
              <CardComponent data={item} onClick={() => handleClick(item)} />
            </CardWrapper>
          ))}
      </Wrapper>

      <ActionsBlock>
        {isActive && <DealerButton>D</DealerButton>}

        <PlayerInfo>
          <Name>Player {id}</Name>
          <Points>{points}</Points>
        </PlayerInfo>
      </ActionsBlock>

      {isShownSuitSelect && isActive && (
        <SuitSelect
          onChange={(e) => {
            setSuit(e.target.value)
            setIsShownSuitSelect(false)
            sendToNextStep(id, false, 8)
          }}
        />
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
  left: -${({ left }) => left * 70}px;

  &:hover div {
    transform: translateY(-25px);
  }
`

const ActionsBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const DealerButton = styled.div`
  width: 30px;
  min-width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #eee683;
  font-weight: bold;
`

const Points = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e8f3f5;
  font-weight: bold;
`

const PlayerInfo = styled.div`
  position: relative;
  padding: 5px 15px;
  background-color: #345c97;
  border: 2px solid #d2e4d6;
  border-radius: 10px;
`

const Name = styled.div`
  position: relative;
  color: #e8f3f5;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%);
    width: 40px;
    height: 1px;
    background-color: #d2e4d6;
  }
`
