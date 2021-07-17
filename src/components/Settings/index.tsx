import React from 'react'
import styled from 'styled-components'

import { useGame } from '@app/hooks/useGame'

export const Settings = () => {
  const { changePlayersAmount, players } = useGame()

  const handleChange = (e: any) => {
    changePlayersAmount(+e.target.value)
  }

  return (
    <Container>
      <Title>SETTINGS</Title>
      Players:{'   '}
      <label>
        2
        <input
          name="players-amount"
          type="radio"
          value="2"
          checked={players === 2}
          onChange={handleChange}
        />
      </label>
      <label>
        3
        <input
          name="players-amount"
          type="radio"
          value="3"
          checked={players === 3}
          onChange={handleChange}
        />
      </label>
      <label>
        4
        <input
          name="players-amount"
          type="radio"
          value="4"
          checked={players === 4}
          onChange={handleChange}
        />
      </label>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 10px;
  border: 2px solid #276180;
  border-radius: 10px;
  font-weight: bold;

  label {
    margin-left: 8px;
    cursor: pointer;
  }

  label,
  input {
    cursor: pointer;
  }
`

const Title = styled.h2`
  margin: 0 0 8px;
  color: #276180;
`
