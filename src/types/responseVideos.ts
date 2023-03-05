export interface ResponseVideos {
  kind: string
  etag: string
  items: ResponseVideosItems[]
  pageInfo: PageInfo
}

interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

export interface ResponseVideosItems {
  kind: string
  etag: string
  id: string
  snippet: Snippet
  statistics: Statistics
}

interface Statistics {
  viewCount: string
  likeCount: string
  favoriteCount: string
  commentCount: string
}

interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  categoryId: string
  liveBroadcastContent: string
  localized: Localized
}

interface Localized {
  title: string
  description: string
}

interface Thumbnails {
  default: Default
  medium: Default
  high: Default
  standard: Default
  maxres: Default
}

interface Default {
  url: string
  width: number
  height: number
}
