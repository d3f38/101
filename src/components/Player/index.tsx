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
    kickPlayer,
  } = usePlayers()

  const { pauseGame, finishGame, gameOver, continueGame } = useGame()

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
      notify(`Player ${id} takes ${amountCards} cards`)
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
        console.log('pause', 1)
      } else if (isCoveredSix && !isShownSuitSelect) {
        sendToNextStep(id, false, 5)
      }

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

      if (
        !nextStepExist &&
        alreadyTookTheCard &&
        !isShownSuitSelect &&
        isCoveredSix
      ) {
        sendToNextStep(id, false, 7)
        setAlreadyTookTheCard(false)
      }
    } else {
      console.log('pause', 2)
      pauseGame()

      allPlayers.forEach((item) => {
        const roundPoints = calcPoints(item.cards)

        updatePoints(item.id, roundPoints)
      })
    }
  }, [cards, pile, activeSuit, isShownSuitSelect, isCoveredSix])

  // useEffect(() => {
  //   if (!isPlaying && cards.length && !isShownSuitSelect) {
  //     const roundPoints = calcPoints(cards)

  //     updatePoints(id, roundPoints)
  //   }
  // }, [isPlaying])

  useEffect(() => {
    if (points > 25) {
      kickPlayer(id)
      console.log('pause', 3)
      pauseGame()

      notify(`Player ${id} is out`)
    } else if (gameOver) {
      console.log('winner Player', id)
      finishGame()
    }
  }, [points])

  useEffect(() => {
    if (isActive) {
      setTimeout(() => handleClick(cards[0]), 200)
    }
  }, [])

  return (
    <Container
      isActive={isActive && !gameOver}
      isOpponent={isOpponent}
      players={allPlayers.length}
    >
      <Wrapper disabled={isShownSuitSelect}>
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

      {isShownSuitSelect && isActive && cards.length > 0 && (
        <SuitSelect
          onChange={(e) => {
            setSuit(e.target.value)
            setIsShownSuitSelect(false)
            sendToNextStep(id, false, 8)
            continueGame()
          }}
        />
      )}
    </Container>
  )
}

const Container = styled.div<{
  isActive: boolean
  isOpponent: boolean
  players: number
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: ${({ isActive }) => (isActive ? 'all' : 'none')};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};

  &:nth-child(odd) {
    position: relative;
    top: ${({ isOpponent, players }) =>
      isOpponent && players !== 3 && players !== 2 ? '200px' : '0'};
  }
`

const Wrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  min-height: 110px;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

const CardWrapper = styled.div<{ left: number }>`
  position: relative;
  width: 25px;
  left: -25px;

  &:hover div {
    transform: translateY(-25px);
  }
`

const ActionsBlock = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`

const DealerButton = styled.div`
  position: absolute;
  top: 15px;
  left: -40px;
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
