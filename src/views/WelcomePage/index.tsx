import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { Card } from '@app/components/Card'

type Deck = {
  success: boolean
  deck_id: string
  remaining: number
  shuffled: boolean
}

type PlayerCards = {
  success: boolean
  cards: {
    image: string
    value: string
    suit: string
    code: string
  }[]

  deck_id: string
  remaining: number
}

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
  const [playerCards, setPlayerCards] = useState<PlayerCards | null>(null)
  const [playersAmount, setPlayersAmount] = useState('2')
  // const [step, setStep] = useState('2')

  const getNewDeck = async () => {
    const response = await axios(
      'https://deckofcardsapi.com/api/deck/new/shuffle'
    ).then((res) => res.data)

    setDeck(response)
  }

  const getHand = async (deck_id: string) => {
    const response = await axios(
      `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=4`
    ).then((res) => res.data)

    setPlayerCards(response)
  }

  useEffect(() => {
    getNewDeck()
  }, [])

  useEffect(() => {
    if (deck) {
      // if (playersAmount === '2') {
      // }
      getHand(deck.deck_id)
    }
  }, [deck, playersAmount])

  return (
    <Container>
      <h1>Welcome to the game!</h1>
      <div>
        <select
          name="players-amount"
          onChange={(e) => setPlayersAmount(e.target.value)}
        >
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <Table>
        {playerCards &&
          playerCards.cards.map((item: any) => (
            <Card data={item} key={item.code} />
          ))}
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
  display: flex;
`
