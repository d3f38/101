import React, { FC, useState } from 'react'
import styled from 'styled-components'

import { Card, Cards } from '@app/types/common.types'
import { checkCardRules } from '@app/utils/checkCardRules'
import { notify } from '@app/utils/notify'

import { CardComponent } from '../Card'

export const Player: FC<{
  cards: Cards
  pileCards: Cards
  setPileCards: (e: Cards) => void
}> = ({ cards, pileCards, setPileCards }) => {
  const [playerCards, setPlayerCards] = useState<Cards>(cards)

  const handleClick = (card: Card) => {
    const isMatchRules = checkCardRules(card, pileCards[pileCards.length - 1])

    if (isMatchRules) {
      setPileCards([...pileCards, card])
      setPlayerCards([...playerCards.filter((item) => item.code !== card.code)])
    } else {
      notify('Вы не можете сходить этой картой!')
    }
  }

  return (
    <Wrapper>
      {playerCards &&
        playerCards.map((item: any) => (
          <CardComponent
            data={item}
            key={item.code}
            onClick={() => handleClick(item)}
          />
        ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
