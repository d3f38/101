import React, { FC } from 'react'
import styled from 'styled-components'

type CardData = {
  image: string
  value: string
  suit: string
  code: string
}

export const Card: FC<{ data: CardData }> = ({ data }) => {
  return (
    <CardWrapper
      data-value={data.value}
      data-suit={data.suit}
      data-code={data.code}
    >
      <img src={data.image} />
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  width: 100px;

  img {
    width: 100%;
  }
`
