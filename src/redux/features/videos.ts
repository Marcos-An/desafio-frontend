import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { VideoInfoTreaded, VideosSearchedType } from '@/types/videos'

export interface VideosState {
  currentSelectedVideoId: string
  videosSearched: VideosSearchedType
}

const initialState: VideosState = {
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

export const { onChangeVideos, onCleanVideos } = videosSlice.actions

export default videosSlice.reducer
