import { Card, Cards, CardsPoint, CardsValue } from '@app/types/common.types'

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
