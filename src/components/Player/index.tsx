import React, { FC, useEffect, useState } from 'react'

import { Player as PlayerType } from '@app/features/players/playersSlice'
import { useDeck, useGame, usePlayers } from '@app/hooks'
import { Card, PenaltyCard } from '@app/types/common.types'
import { calcPoints } from '@app/utils/calcPoints'
import { checkCardRules } from '@app/utils/checkCardRules'
import { checkNextStep } from '@app/utils/checkNextStep'
import { fetchCards } from '@app/utils/fetchers/fetchCards'
import { getCardConditions } from '@app/utils/getCardConditions'
import { getNextPlayerId } from '@app/utils/getNextPlayerId'
import { notify } from '@app/utils/notify'
import { pushOpponentStep } from '@app/utils/pushOpponentStep'

import {
  ActionsBlock,
  CardWrapper,
  Container,
  DealerButton,
  Name,
  PlayerInfo,
  Points,
  Wrapper,
} from './styled'
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
    if (isActive && !isOpponent) {
      setTimeout(() => handleClick(cards[0]), 200)
    }
  }, [])

  // OPPONENT PLAYS

  useEffect(() => {
    if (isActive && isOpponent) {
      const opponentStep = pushOpponentStep(cards, lastPileCard, activeSuit)

      if (opponentStep) {
        setTimeout(() => handleClick(opponentStep), 1000)
      }
    }
  }, [isActive])

  // useEffect(() => {
  //   if (isActive && isOpponent) {
  //   }
  // }, [isActive, isShownSuitSelect])

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
          isOpponent={isOpponent}
          onChange={(e) => {
            setSuit(e)
            setIsShownSuitSelect(false)
            sendToNextStep(id, false, 8)
            continueGame()
          }}
        />
      )}
    </Container>
  )
}
