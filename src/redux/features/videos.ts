import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { VideoInfoTreaded, VideosSearchedType } from '@/types/videos'

export interface VideosState {
  isLoading: boolean
  currentSelectedVideoId: string
  videosSearched: VideosSearchedType
}

const initialState: VideosState = {
  isLoading: false,
  videosSearched: {
    nextPageToken: '',
    items: [] as VideoInfoTreaded[]
  },
  currentSelectedVideoId: ''
}

export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    handleLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    onCleanVideos: (state) => {
      state.videosSearched.items = []
      state.videosSearched.nextPageToken = ''
    },
    onChangeVideos: (state, action: PayloadAction<VideosSearchedType>) => {
      const newItems = [...state.videosSearched.items, ...action.payload.items]

      state.videosSearched.items = newItems
      state.videosSearched.nextPageToken = action.payload.nextPageToken
    }
  }
})

export const { onChangeVideos, onCleanVideos, handleLoading } =
  videosSlice.actions

export default videosSlice.reducer
