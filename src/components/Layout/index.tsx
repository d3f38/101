import React, { FC, memo, useState } from 'react'
import styled from 'styled-components'

import { Rules } from '../Rules'

export const Layout: FC = memo(({ children }) => {
  const [isOpenRules, setIsOpenRules] = useState(false)

  const openRules = () => setIsOpenRules(true)
  const closeRules = () => setIsOpenRules(false)

  return (
    <Container>
      <ButtonRules onClick={openRules}>Rules →</ButtonRules>

      {isOpenRules && <Rules closeRules={closeRules} />}

      {children}
    </Container>
  )
})

const Container = styled.div``

const ButtonRules = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  padding: 5px 10px;
  border-radius: 5px;
  color: #276180;
  background: transparent;
  border: 2px solid;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #00c1ff;
  }
`
