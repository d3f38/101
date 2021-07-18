import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { SUITS } from '@app/constants'
import { ActiveSuit, Suit } from '@app/types/common.types'
import { getRandomInt } from '@app/utils/getRandomInt'

import { SuitIcon } from '../SuitIcon'

export const SuitSelect: FC<{
  onChange: (e: any) => void
  isOpponent: boolean
}> = ({ onChange, isOpponent }) => {
  const [active, setActive] = useState<ActiveSuit | null>(null)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value)

    if (e.target.value) {
      setActive(e.target.value as ActiveSuit)
    }
  }

  const autoChange = (e: ActiveSuit) => {
    onChange(e)

    if (e) {
      setActive(e)
    }
  }

  useEffect(() => {
    if (isOpponent) {
      autoChange(SUITS[getRandomInt(0, SUITS.length)] as ActiveSuit)
    }
  }, [])

  return (
    <Container>
      <Title>Choose a suit!</Title>

      <SuitsContainer>
        {Object.values(Suit).map((key) => (
          <SuitLabel isActive={Suit[key] === active} key={key}>
            <SuitIcon suit={Suit[key]} />
            <input
              name="suit"
              type="checkbox"
              value={Suit[key]}
              onChange={handleChange}
              checked={Suit[key] === active}
            />
          </SuitLabel>
        ))}
      </SuitsContainer>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  margin-top: 16px;
  background-color: #e8f3f5;
  border-radius: 10px;
`

const Title = styled.div`
  margin-bottom: 8px;
  font-weight: bold;
`

const SuitsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const SuitLabel = styled.label<{ isActive: boolean }>`
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 8px;
  }

  svg {
    &:hover {
      transform: scale(1.1);
    }
  }

  input {
    display: none;
  }
`
