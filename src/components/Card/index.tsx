import React, { FC, memo } from 'react'
import styled from 'styled-components'

import { getRandomInt } from '@app/utils/getRandomInt'

type CardData = {
  image: string
  value: string
  suit: string
  code: string
  images: {
    png: string
    svg: string
  }
}

export const CardComponent: FC<{
  data?: CardData
  onClick?: () => void
  withAngle?: boolean
  isActive?: boolean
}> = memo(({ data, onClick, withAngle, isActive }) => {
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
    <CardWrapper isBackside onClick={onClick} isActive={isActive}>
      <img src="./images/backside.jpeg" />
    </CardWrapper>
  )
})

const CardWrapper = styled.div<{
  isBackside?: boolean
  angle?: number
  isActive?: boolean
}>`
  width: ${({ isBackside }) => (isBackside ? '80px' : '80px')};
  height: 110px;
  margin-right: 4px;
  transform: ${({ angle }) => (angle ? 'rotate(' + angle + 'deg)' : '')};
  box-shadow: ${({ isActive }) =>
    isActive ? 'rgb(238 230 131 / 50%) 0px 7px 29px 0px' : 'none'};
  cursor: ${({ isActive, isBackside }) =>
    isActive || !isBackside ? 'pointer' : 'default'};

  img {
    width: 100%;
    border: ${({ isBackside }) => (isBackside ? '1px solid #8f8f8f' : '0')};
    border-radius: ${({ isBackside }) => (isBackside ? '5px' : '0')};
  }
`
