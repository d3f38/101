import React, { FC, useState } from 'react'
import styled from 'styled-components'

import { ActiveSuit, Suit } from '@app/types/common.types'

import { SuitIcon } from '../SuitIcon'

export const SuitSelect: FC<{ onChange: (e: any) => void }> = ({
  onChange,
}) => {
  const [active, setActive] = useState<ActiveSuit | null>(null)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e)

    if (e.target.value) {
      setActive(e.target.value as ActiveSuit)
    }
  }

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
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
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
