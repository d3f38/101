import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from '@app/app/rootReducer'
import { Cards } from '@app/types/common.types'

export const getNewDeck = createAsyncThunk('deck/getNewDeck', async () => {
  const response = await axios(
    `${process.env.REACT_APP_API_URL}/deck/new/shuffle`
  )

  return response.data
})

export const takeCards = createAsyncThunk(
  'deck/takeCards',
  async (cardsAmount: number, { getState }) => {
    console.log('🚀 ~ file: deckSlice.ts ~ line 18 ~ cardsAmount', cardsAmount)
    // @ts-ignore
    const { deckId, status } = getState().deck

    if (status !== 'pending') {
      return
    }

    const response = await axios(
      `${process.env.REACT_APP_API_URL}/deck/${deckId}/draw/?count=${cardsAmount}`
    )

    return response.data
  }
)

interface DeckState {
  deckId: string | undefined
  remaining: number
  status: 'idle' | 'pending'
  cardsInGame: Cards
  pile: Cards
}

const initialState: DeckState = {
  deckId: undefined,
  remaining: 0,
  status: 'idle',
  cardsInGame: [],
  pile: [],
}

export const deckSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    updatePile: (state, action) => {
      state.pile = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewDeck.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(getNewDeck.fulfilled, (state, action) => {
        state.deckId = action.payload.deck_id
        state.remaining = action.payload.remaining
      })
      .addCase(takeCards.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(takeCards.fulfilled, (state, action) => {
        const lastCardIndex = action.payload.cards.length - 1

        state.status = 'idle'
        state.cardsInGame = action.payload.cards.slice(0, lastCardIndex)
        state.remaining = action.payload.remaining
        state.pile = [action.payload.cards[lastCardIndex]]
      })
  },
})

// Selectors
export const selectDeck = (state: RootState) => state.deck

export const { updatePile } = deckSlice.actions

export default deckSlice.reducer
