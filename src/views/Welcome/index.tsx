import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { CardsIcon } from '@app/components/icons/Cards'
import { Settings } from '@app/components/Settings'
import { useDeck } from '@app/hooks/useDeck'
import { useGame } from '@app/hooks/useGame'
import { usePlayers } from '@app/hooks/usePlayers'

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

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const Title = styled.h1`
  font-size: 54px;
`

const StyledLink = styled(Link)`
  padding: 5px 10px;

  text-decoration: none;
  font-size: 32px;
  font-weight: bold;
  color: #276180;
  border: 2px solid;
  border-radius: 10px;

  &:hover {
    color: #00c1ff;
  }
`

const StyledCardsIcon = styled(CardsIcon)`
  width: 200px;
  height: 200px;
`

const ButtonLink = styled.button`
  margin-bottom: 32px;
  background: none;
  border: 0;
`

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`
