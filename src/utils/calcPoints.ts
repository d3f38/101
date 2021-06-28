import { Card, Cards, CardsPoints, CardsValues } from '@app/types/common.types'

export const calcPoints = (cards: Cards) => {
  const points = cards.reduce((acc: number, curr: Card) => {
    if (Number(curr.value) >= 0) {
      if (curr.value === '0') {
        acc = acc + 10
      } else {
        acc = acc + Number(curr.value)
      }
    } else {
      switch (curr.value) {
        case CardsValues.JACK:
          acc = acc + CardsPoints.JACK
          break

        case CardsValues.QUEEN:
          acc = acc + CardsPoints.QUEEN
          break

        case CardsValues.KING:
          acc = acc + CardsPoints.KING
          break

        case CardsValues.ACE:
          acc = acc + CardsPoints.ACE
          break

        default:
          break
      }
    }

    return acc
  }, 0)

  console.log('🚀 ~ file: calcPoints.ts ~ points = ', points)

  return points
}
