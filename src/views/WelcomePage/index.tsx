import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { CardComponent } from '@app/components/Card'
import { Pile } from '@app/components/Pile'
import { Player } from '@app/components/Player'
import { Cards, CardsData, Deck } from '@app/types/common.types'
import { splitCardsForPlayers } from '@app/utils/splitArrayIntoChunks'

const CARDS_IN_HAND = 4

// const Player = ({ isActive }) => {
//   const [cards, setCards] = useState([])
//   const [points, setPoints] = useState(0)

//   // deck

//   useEffect(() => {
//     console.log('🚀 ~ file: index.tsx ~ line 34 ~ Player ~ isActive', isActive)
//   }, isActive)

//   return (
//     <div>
//       {cards.map((item: any) => (
//         <Card data={item} key={item.code} />
//       ))}
//     </div>
//   )
// }

export const WelcomePage = () => {
  const [deck, setDeck] = useState<Deck | null>(null)
  const [playerCards, setPlayerCards] = useState<Cards | null>(null)
  const [opponentsCards, setOpponentsCards] = useState<Cards[] | null>(null)
  const [playersAmount, setPlayersAmount] = useState(2)
  const [pileCards, setPileCards] = useState<Cards>([])
  // const [step, setStep] = useState('2')

  const handOutCards = async (deck_id: string, players: number) => {
    const player = await getHand(deck_id)

    setPlayerCards(player.cards)

    const opponentsData = await getHand(deck_id, CARDS_IN_HAND * players)

    const splittedPlayersCards = splitCardsForPlayers(
      opponentsData.cards,
      CARDS_IN_HAND
    )
    console.log(
      '🚀 ~ file: index.tsx ~ line 51 ~ handOutCards ~ splittedPlayersCards',
      splittedPlayersCards
    )

    setOpponentsCards(splittedPlayersCards)

    const firstPileCard = await getHand(deck_id, 1)

    setPileCards(firstPileCard.cards)
  }

  const getNewDeck = async () => {
    const response = await axios(
      'https://deckofcardsapi.com/api/deck/new/shuffle'
    ).then((res) => {
      console.log(
        '%c new deck =>',
        'background: #222; color: #bada55',
        res.data
      )

      return res.data
    })

    setDeck(response)
  }

  const getHand = (
    deck_id: string,
    cardsAmount = CARDS_IN_HAND
  ): Promise<CardsData> => {
    return axios(
      `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${cardsAmount}`
    ).then((res) => res.data)
  }

  useEffect(() => {
    getNewDeck()
  }, [])

  useEffect(() => {
    if (deck) {
      // if (playersAmount === '2') {
      // }
      handOutCards(deck.deck_id, playersAmount)
    }
  }, [deck, playersAmount])

  return (
    <Container>
      <h1>Welcome to the game!</h1>
      <div>
        <select
          name="players-amount"
          onChange={(e) => setPlayersAmount(+e.target.value)}
        >
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <Table>
        <OpponentsSide>
          {opponentsCards &&
            opponentsCards.map((item: any) => (
              <Player
                key={item.remaining}
                cards={item}
                pileCards={pileCards}
                setPileCards={setPileCards}
              />
            ))}
        </OpponentsSide>

        <PlayerField>
          <CardComponent />
          <Pile cards={pileCards} />
        </PlayerField>

        {playerCards && (
          <Player
            cards={playerCards}
            pileCards={pileCards}
            setPileCards={setPileCards}
          />
        )}
      </Table>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-top: 60px;

  .ant-form label {
    font-size: 16px;
    line-height: 22px;
  }
`

const Table = styled.div`
  width: 100%;
`

const PlayerField = styled.div`
  display: flex;
  justify-content: center;
`

const OpponentsSide = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
