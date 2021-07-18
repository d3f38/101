import React, { useEffect } from 'react'

import { Settings } from '@app/components/Settings'
import { useDeck, useGame, usePlayers } from '@app/hooks'

import {
  ButtonLink,
  Container,
  Menu,
  StyledCardsIcon,
  StyledLink,
  Title,
} from './styled'

export const Welcome = () => {
  const { getNewDeck } = useDeck()
  const { clearPoints } = usePlayers()
  const { clearGame } = useGame()

  const startGame = () => {
    clearPoints()
    getNewDeck()
  }

  useEffect(() => {
    clearGame()
  }, [])

  return (
    <Container>
      <StyledCardsIcon />
      <Title>101</Title>
      <Menu>
        <ButtonLink>
          <StyledLink to="/game" onClick={startGame}>
            NEW GAME
          </StyledLink>
        </ButtonLink>

        <Settings />
      </Menu>
    </Container>
  )
}
