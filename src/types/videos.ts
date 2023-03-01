export interface VideoInfoTreaded {
  videoId: string
  channelName: string
  channelProfilePicture: string
  title: string
  thumbnail: string
  views: number
  videolikes: number
  uploadDate: string
}

export interface Comments {
  comment: string
  authorDisplayName: string
  authorProfileImageUrl: string
  likeCount: number
  updatedAt: string
}

export interface VideoInfo {
  videoId: string
  channelName: string
  channelProfilePicture: string
  title: string
  description: string
  viewCount: number
  subscriberCount: number
  commentCount: number
  likeCount: number
  uploadDate: string
}

export interface CurrentVideoInfo {
  currentVideo: VideoInfo
  comments: Comments[]
}

export interface VideosSearchedType {
  nextPageToken: string
  items: VideoInfoTreaded[]
}
