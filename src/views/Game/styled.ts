import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .ant-form label {
    font-size: 16px;
    line-height: 22px;
  }
`

export const Table = styled.div`
  position: relative;
  width: 1000px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 25px 75px 25px 45px;
  background-color: #35654d;
  border: 30px solid #394b41;
  box-sizing: border-box;
  border-radius: 100px;
`

export const TableCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-75%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Notification = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  color: #f1fcf6;
  font-size: 24px;
`

export const GameInfo = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  color: #f1fcf6;
  font-weight: bold;
`

export const SuitIconWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: -45px;
  left: 50%;
  transform: translateX(-25%);
  white-space: nowrap;
  color: #f1fcf6;
  font-weight: bold;

  svg {
    margin-left: 8px;
  }
`

export const OpponentsSide = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`

export const Result = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ResultMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-bottom: 8px;
  font-weight: bold;
  color: #f1fcf6;
`

export const NewGameButton = styled.button`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #d2e4d6;
  background: #575593;
  border: 2px solid #f1fcf6;
  border-radius: 10px;
  color: #f1fcf6;
  font-weight: bold;
  cursor: pointer;
`

export const NextRound = styled.button`
  position: absolute;
  z-index: 10;
  left: 35px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #d2e4d6;
  background: #575593;
  border: 2px solid #f1fcf6;
  border-radius: 10px;
  color: #f1fcf6;
  font-weight: bold;
  cursor: pointer;

  svg {
    width: 40px;
    height: 40px;
    margin-right: 8px;
    fill: #eee683;
  }
`

export const LinkBack = styled(Link)`
  position: absolute;
  left: 25px;
  top: 25px;
  background: transparent;
  color: #276180;
  border: 0;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: #00c1ff;
  }
`
