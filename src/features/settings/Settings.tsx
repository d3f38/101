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
      Players:{' '}
      <select
        name="players-amount"
        onChange={handleChange}
        value={playersAmount}
      >
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`
