import { VideoInfoTreaded } from './videos'

export interface Videos {
  nextPageToken: string
  items: VideoInfoTreaded[]
}

export interface ChannelInfos {
  customUrl: string
  channelName: string
  channelProfilePicture: string
  subscriberCount: number
  videos: Videos
}
