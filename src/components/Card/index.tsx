import React, { FC, memo } from 'react'
import styled from 'styled-components'

import { getRandomInt } from '@app/utils/getRandomInt'

type CardData = {
  image: string
  value: string
  suit: string
  code: string
}

export const CardComponent: FC<{
  data?: CardData
  onClick?: () => void
  withAngle?: boolean
}> = memo(({ data, onClick, withAngle }) => {
  return data ? (
    <CardWrapper
      data-value={data.value}
      data-suit={data.suit}
      data-code={data.code} //TODO: delete for prod
      onClick={onClick}
      {...(withAngle && { angle: getRandomInt(0, 45) })}
    >
      <img src={data.image} />
    </CardWrapper>
  ) : (
    <CardWrapper isBackside onClick={onClick}>
      <img src="./images/backside.jpeg" />
    </CardWrapper>
  )
})

const CardWrapper = styled.div<{ isBackside?: boolean; angle?: number }>`
  width: ${({ isBackside }) => (isBackside ? '100px' : '102px')};
  margin-right: 4px;
  transform: rotate(${({ angle }) => angle}deg);

  img {
    width: 100%;
    border: ${({ isBackside }) => (isBackside ? '1px solid #8f8f8f' : '0')};
    border-radius: ${({ isBackside }) => (isBackside ? '5px' : '0')};
  }
`
