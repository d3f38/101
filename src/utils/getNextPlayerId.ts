export const getNextPlayerId = (
  currentActivePlayerId: number,
  playersAmount: number,
  skip = false
) => {
  let nextActivePlayerId = currentActivePlayerId + 1

  if (skip) {
    nextActivePlayerId++
  }

  if (nextActivePlayerId >= playersAmount) {
    nextActivePlayerId = nextActivePlayerId - playersAmount
  }

  return nextActivePlayerId
}
