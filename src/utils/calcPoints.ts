import { Card, Cards, CardsPoint, CardsValue } from '@app/types/common.types'

export const calcPoints = (cards: Cards): number => {
  const points = cards.reduce((acc: number, curr: Card) => {
    const numberValue = Number(curr.value)

    if (numberValue >= 2 && numberValue <= 10) {
      if (numberValue !== 9) {
        acc = acc + numberValue
      }
    } else {
      switch (curr.value) {
        case CardsValue.JACK:
          acc = acc + CardsPoint.JACK
          break

        case CardsValue.QUEEN:
          acc = acc + CardsPoint.QUEEN
          break

        case CardsValue.KING:
          acc = acc + CardsPoint.KING
          break

        case CardsValue.ACE:
          acc = acc + CardsPoint.ACE
          break

        default:
          break
      }
    }

    return acc
  }, 0)

  return points
}
