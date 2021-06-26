import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Settings } from '@app/features/settings/Settings'

export const Welcome = () => {
  return (
    <Container>
      <h1>Welcome to the game!</h1>
      <div>
        <StyledLink to="/game">START</StyledLink>

        <Settings />
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledLink = styled(Link)`
  color: green;
  text-decoration: none;
  font-size: 32px;
  font-weight: bold;
`
