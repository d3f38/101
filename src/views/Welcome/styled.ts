import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { CardsIcon } from '@app/components/icons/Cards'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const Title = styled.h1`
  font-size: 54px;
`

export const StyledLink = styled(Link)`
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

export const StyledCardsIcon = styled(CardsIcon)`
  width: 200px;
  height: 200px;
`

export const ButtonLink = styled.button`
  margin-bottom: 32px;
  background: none;
  border: 0;
`

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`
