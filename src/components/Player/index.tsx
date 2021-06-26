import React, { FC, useState } from 'react'
import styled from 'styled-components'

import { Card, Cards } from '@app/types/common.types'
import { chackCardRules } from '@app/utils/chackCardRules'
import { notify } from '@app/utils/notify'

import { CardComponent } from '../Card'

export const Player: FC<{
  cards: Cards
  pileCards: Cards
  setPileCards: (e: Cards) => void
}> = ({ cards, pileCards, setPileCards }) => {
  console.log('🚀 ~ file: index.tsx ~ line 38 ~ cards', cards)
  const [playerCards, setPlayerCards] = useState<Cards>(cards)

  const handleClick = (card: Card) => {
    const isMatchRules = chackCardRules(card, pileCards[pileCards.length - 1])

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
