import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './features/search'
import videosSlice from './features/videos'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    videos: videosSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
