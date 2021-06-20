import React from 'react'
import styled from 'styled-components'

export const WhatsAppButton = () => {
  return <StyledButton>Перейти к боту WhatsApp</StyledButton>
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  height: 38px;
  width: 260px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  line-height: 22px;
  background: ${({ theme }) => theme.colors.amazing_green};
  border-color: ${({ theme }) => theme.colors.amazing_green};

  &.ant-btn {
    padding: 8px 16px !important;
  }

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.amazing_green};
    border-color: ${({ theme }) => theme.colors.amazing_green};
  }

  svg {
    position: relative;
    top: -1px;
    height: 16px;
    min-width: 16px;
    margin-right: 8px;
  }
`
