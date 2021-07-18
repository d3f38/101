import styled from 'styled-components'

export const Container = styled.div<{
  isActive: boolean
  isOpponent: boolean
  players: number
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: ${({ isActive }) => (isActive ? 'all' : 'none')};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};

  &:nth-child(odd) {
    position: relative;
    top: ${({ isOpponent, players }) =>
      isOpponent && players !== 3 && players !== 2 ? '200px' : '0'};
  }
`

export const Wrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  min-height: 110px;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

export const CardWrapper = styled.div<{ left: number }>`
  position: relative;
  width: 25px;
  left: -25px;

  &:hover div {
    transform: translateY(-25px);
  }
`

export const ActionsBlock = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`

export const DealerButton = styled.div`
  position: absolute;
  top: 15px;
  left: -40px;
  width: 30px;
  min-width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #eee683;
  font-weight: bold;
`

export const Points = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e8f3f5;
  font-weight: bold;
`

export const PlayerInfo = styled.div`
  position: relative;
  padding: 5px 15px;
  background-color: #345c97;
  border: 2px solid #d2e4d6;
  border-radius: 10px;
`

export const Name = styled.div`
  position: relative;
  color: #e8f3f5;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%);
    width: 40px;
    height: 1px;
    background-color: #d2e4d6;
  }
`
