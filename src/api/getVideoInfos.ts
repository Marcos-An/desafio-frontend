import { gapi } from '@api/axios'
import { Comments, CurrentVideoInfo, VideoInfo } from '@/types/videos'
import { ResponseVideosItems } from '@/types/responseVideos'
import { ResponseChannelsItems } from '@/types/responseChannels'
import {
  ResponseCommentsThreads,
  ResponseCommentsThreadsItems
} from '@/types/responseCommentsThreads'

export async function getVideoInfos(id: string): Promise<CurrentVideoInfo> {
  try {
    const responseDatacomments: Comments[] = []
    const responseDataCurrentVideo: VideoInfo = {} as VideoInfo

    const videoResponse: ResponseVideosItems = await gapi
      .get('/videos', {
        params: {
          part: 'snippet,statistics',
          id: id
        }
      })
      .then(({ data }) => data.items[0])

    const channelInfos: ResponseChannelsItems = await gapi
      .get('/channels', {
        params: {
          part: 'snippet,statistics',
          id: videoResponse.snippet.channelId
        }
      })
      .then(({ data }) => data.items[0])

    responseDataCurrentVideo.videoId = id
    responseDataCurrentVideo.channelId = videoResponse.snippet.channelId
    responseDataCurrentVideo.title = videoResponse.snippet.title
    responseDataCurrentVideo.description = videoResponse.snippet.description
    responseDataCurrentVideo.channelName = channelInfos.snippet.title
    responseDataCurrentVideo.channelProfilePicture =
      channelInfos.snippet.thumbnails.default.url
    responseDataCurrentVideo.viewCount = Number(
      videoResponse.statistics.viewCount
    )
    responseDataCurrentVideo.subscriberCount = Number(
      channelInfos.statistics.subscriberCount
    )
    responseDataCurrentVideo.likeCount = Number(
      videoResponse.statistics.likeCount
    )
    responseDataCurrentVideo.commentCount = Number(
      videoResponse.statistics.commentCount
    )
    responseDataCurrentVideo.uploadDate = videoResponse.snippet.publishedAt

    const commentsResponse: ResponseCommentsThreads = await gapi
      .get('/commentThreads', {
        params: {
          part: 'snippet',
          videoId: id,
          order: 'relevance'
        }
      })
      .then(({ data }) => data)

    commentsResponse.items.forEach((comment: ResponseCommentsThreadsItems) => {
      const newComment = {
        comment: comment.snippet.topLevelComment.snippet.textDisplay,
        authorProfileImageUrl:
          comment.snippet.topLevelComment.snippet.authorProfileImageUrl,
        authorDisplayName:
          comment.snippet.topLevelComment.snippet.authorDisplayName,
        likeCount: comment.snippet.topLevelComment.snippet.likeCount,
        updatedAt: comment.snippet.topLevelComment.snippet.updatedAt
      }

      responseDatacomments.push(newComment)
    })

    return {
      currentVideo: responseDataCurrentVideo,
      comments: responseDatacomments
    }
  } catch (error) {
    console.error(error)
    return { currentVideo: {} as VideoInfo, comments: [] }
  }
}
