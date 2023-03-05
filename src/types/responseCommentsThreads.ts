export interface ResponseCommentsThreads {
  kind: string
  etag: string
  nextPageToken: string
  pageInfo: PageInfo
  items: ResponseCommentsThreadsItems[]
}

export interface ResponseCommentsThreadsItems {
  kind: string
  etag: string
  id: string
  snippet: Snippet2
}

interface Snippet2 {
  videoId: string
  topLevelComment: TopLevelComment
  canReply: boolean
  totalReplyCount: number
  isPublic: boolean
}

interface TopLevelComment {
  kind: string
  etag: string
  id: string
  snippet: Snippet
}

interface Snippet {
  videoId: string
  textDisplay: string
  textOriginal: string
  authorDisplayName: string
  authorProfileImageUrl: string
  authorChannelUrl: string
  authorChannelId: AuthorChannelId
  canRate: boolean
  viewerRating: string
  likeCount: number
  publishedAt: string
  updatedAt: string
}

interface AuthorChannelId {
  value: string
}

interface PageInfo {
  totalResults: number
  resultsPerPage: number
}
