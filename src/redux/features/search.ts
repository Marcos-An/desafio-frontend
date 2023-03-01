import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SearchState {
  value: string
  historic: string[]
}

const initialState: SearchState = {
  value: '',
  historic: []
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    onChangeSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    onChangeHistoric: (state, action: PayloadAction<string[]>) => {
      state.historic = [...action.payload]
    }
  }
})

export const { onChangeSearch, onChangeHistoric } = searchSlice.actions

export default searchSlice.reducer
