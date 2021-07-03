import React, { FC } from 'react'
import styled from 'styled-components'

import { ActiveSuit, Suit } from '@app/types/common.types'

import { ClubsIcon } from '../icons/Clubs'
import { DiamondsIcon } from '../icons/Diamonds'
import { HeartsIcon } from '../icons/Hearts'
import { SpadesIcon } from '../icons/Spades'

export const SuitIcon: FC<{ suit: ActiveSuit }> = ({ suit }) => {
  let icon = null

  switch (suit) {
    case Suit.CLUBS:
      icon = <ClubsIcon />
      break
    case Suit.DIAMONDS:
      icon = <DiamondsIcon />
      break
    case Suit.HEARTS:
      icon = <HeartsIcon />
      break
    case Suit.SPADES:
      icon = <SpadesIcon />
      break
    default:
      break
  }

  return <Wrapper>{icon}</Wrapper>
}

const Wrapper = styled.div`
  width: 25px;
  height: 25px;

  svg {
    width: 100%;
    height: 100%;
  }
`
