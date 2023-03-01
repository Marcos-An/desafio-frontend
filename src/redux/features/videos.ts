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
    onChangeVideos: (state, action: PayloadAction<VideosSearchedType>) => {
      const newItems = [...state.videosSearched.items, ...action.payload.items]

      state.videosSearched.items = newItems
      state.videosSearched.nextPageToken = action.payload.nextPageToken
    },
    onSelectVideo: (state, action: PayloadAction<string>) => {
      state.currentSelectedVideoId = action.payload
    }
  }
})

export const { onChangeVideos } = videosSlice.actions

export default videosSlice.reducer
