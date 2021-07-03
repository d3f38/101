import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { Player as PlayerType } from '@app/features/players/playersSlice'
import { useDeck } from '@app/hooks/useDeck'
import { usePlayers } from '@app/hooks/usePlayers'
import { Card, PenaltyCard } from '@app/types/common.types'
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
  } = usePlayers()

  const lastPileCard = pile[pile.length - 1]
  const { id, isActive, cards, points } = data

  const [isShownSuitSelect, setIsShownSuitSelect] = useState(false)
  const [isCoveredSix, setIsCoveredSix] = useState(true)

  const sendToNextStep = (id: number, skip = false) => {
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
        sendToNextStep(id, true)
      } else if (cardConditions.isSpadesKing) {
        getCards(nextPlayerId, PenaltyCard.KING_SPADES)
        sendToNextStep(id, true)
      } else if (cardConditions.isSpadesSeven) {
        getCards(nextPlayerId, PenaltyCard.SEVEN_SPADES)
        sendToNextStep(id, true)
      } else if (cardConditions.isSeven) {
        getCards(nextPlayerId, PenaltyCard.SEVEN)
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
      notify(`You can't go with this card!`)
    }
  }

  useEffect(() => {
    const nextStepExist = checkNextStep(cards, lastPileCard, activeSuit)
    setHasNextStep(id, nextStepExist)

    if (!nextStepExist && alreadyTookTheCard && !isShownSuitSelect) {
      sendToNextStep(id)
      setAlreadyTookTheCard(false)
    }
  }, [cards, pile, activeSuit, isShownSuitSelect])

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
            sendToNextStep(id)
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
  left: -${({ left }) => left}px;

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
