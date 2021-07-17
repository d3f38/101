import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from '@app/app/rootReducer'
import { ActiveSuit, Cards } from '@app/types/common.types'
import { fetchCards } from '@app/utils/fetchers/fetchCards'

export const getNewDeck = createAsyncThunk('deck/getNewDeck', async () => {
  const response = await axios(
    `${process.env.REACT_APP_API_URL}/deck/new/shuffle`
  )

  return response.data
})

export const takeInitialCards = createAsyncThunk(
  'deck/takeInitialCards',
  async (cardsAmount: number, { getState }) => {
    // @ts-ignore
    const { deckId, status } = getState().deck

    if (status !== 'pending') {
      return
    }

    const response = await fetchCards(deckId, cardsAmount)

    return response.data
  }
)

interface DeckState {
  deckId: string | undefined
  remaining: number
  status: 'idle' | 'pending'
  cardsInGame: Cards
  pile: Cards
  activeSuit: ActiveSuit | null
  error: any
  alreadyTookTheCard: boolean
}

const initialState: DeckState = {
  deckId: undefined,
  remaining: 0,
  status: 'idle',
  cardsInGame: [],
  pile: [],
  activeSuit: null,
  error: null,
  alreadyTookTheCard: false,
}

export const deckSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    updatePile: (state, action) => {
      state.pile = action.payload
    },
    updateRemaining: (state, action) => {
      state.remaining = action.payload
    },
    setSuit: (state, action) => {
      state.activeSuit = action.payload
    },
    setAlreadyTookTheCard: (state, action) => {
      state.alreadyTookTheCard = action.payload
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
        state.activeSuit = null
      })
      .addCase(getNewDeck.rejected, (state, action) => {
        state.status = 'idle'
        state.error = action.error
      })

      .addCase(takeInitialCards.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(takeInitialCards.fulfilled, (state, action) => {
        state.status = 'idle'
        state.cardsInGame = action.payload.cards
        state.remaining = action.payload.remaining
        state.pile = []
      })
  },
})

// Selectors
export const selectDeck = (state: RootState) => state.deck

export const deckActions = deckSlice.actions

export default deckSlice.reducer
