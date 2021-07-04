import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { changePlayersAmount, selectSettings } from './settingsSlice'

export const Settings = () => {
  const dispatch = useDispatch()
  const { playersAmount } = useSelector(selectSettings)

  const handleChange = (e: any) => {
    dispatch(changePlayersAmount(+e.target.value))
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
          checked={playersAmount === 2}
          onChange={handleChange}
        />
      </label>
      <label>
        3
        <input
          name="players-amount"
          type="radio"
          value="3"
          checked={playersAmount === 3}
          onChange={handleChange}
        />
      </label>
      <label>
        4
        <input
          name="players-amount"
          type="radio"
          value="4"
          checked={playersAmount === 4}
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
  }
`

const Title = styled.h2`
  margin: 0 0 8px;
  color: #276180;
`
