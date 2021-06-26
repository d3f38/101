import { Cards } from '@app/types/common.types'

export const splitCardsForPlayers = (array: Cards, chunk = 4) => {
  let tempArray: Cards = []
  const result: Cards[] = []

  for (let i = 0, j = array.length; i < j; i += chunk) {
    tempArray = array.slice(i, i + chunk)

    result.push(tempArray)
  }

  return result
}
