import React, { FC, memo } from 'react'
import styled from 'styled-components'

import { Cards } from '@app/types/common.types'

import { CardComponent } from '../Card'

export const Pile: FC<{ cards: Cards }> = memo(({ cards }) => {
  return (
    <Container>
      {cards &&
        cards.map((item) => (
          <CardWrapper key={item.code}>
            <CardComponent data={item} withAngle />
          </CardWrapper>
        ))}
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  margin-left: 100px;
`

const CardWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`
