import { gapi } from '@api/axios'
import { Comments, CurrentVideoInfo, VideoInfo } from '@/types/videos'

export async function getVideoInfos(id: string): Promise<CurrentVideoInfo> {
  try {
    const responseDatacomments: Comments[] = []
    const responseDataCurrentVideo: VideoInfo = {} as VideoInfo

    const videoResponse = await gapi
      .get('/videos', {
        params: {
          part: 'snippet,statistics',
          id: id
        }
      })
      .then(({ data }) => data.items[0])

    const channelInfos = await gapi
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
    responseDataCurrentVideo.viewCount = videoResponse.statistics.viewCount
    responseDataCurrentVideo.subscriberCount =
      channelInfos.statistics.subscriberCount
    responseDataCurrentVideo.likeCount = videoResponse.statistics.likeCount
    responseDataCurrentVideo.commentCount =
      videoResponse.statistics.commentCount
    responseDataCurrentVideo.uploadDate = videoResponse.snippet.publishedAt

    const commentsResponse = await gapi.get('/commentThreads', {
      params: {
        part: 'snippet',
        videoId: id,
        order: 'relevance'
      }
    })

    commentsResponse.data.items.forEach((comment: any) => {
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
