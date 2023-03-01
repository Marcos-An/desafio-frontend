import { gapi } from '@api/axios'
import { Comments, CurrentVideoInfo, VideoInfo } from '@/types/videos'

export async function getVideoInfos(id: string): Promise<CurrentVideoInfo> {
  try {
    const responseDatacomments: Comments[] = []
    const responseDataCurrentVideo: VideoInfo = {} as VideoInfo

    const videoResponse = await gapi.get('/videos', {
      params: {
        part: 'snippet,statistics',
        id: id
      }
    })

    const channelInfos = await gapi.get('/channels', {
      params: {
        part: 'snippet,statistics',
        id: videoResponse.data.items[0].snippet.channelId
      }
    })

    responseDataCurrentVideo.videoId = id
    responseDataCurrentVideo.title = videoResponse.data.items[0].snippet.title
    responseDataCurrentVideo.description =
      videoResponse.data.items[0].snippet.description
    responseDataCurrentVideo.channelName =
      channelInfos.data.items[0].snippet.title
    responseDataCurrentVideo.channelProfilePicture =
      channelInfos.data.items[0].snippet.thumbnails.default.url
    responseDataCurrentVideo.viewCount =
      videoResponse.data.items[0].statistics.viewCount
    responseDataCurrentVideo.subscriberCount =
      channelInfos.data.items[0].statistics.subscriberCount
    responseDataCurrentVideo.likeCount =
      videoResponse.data.items[0].statistics.likeCount
    responseDataCurrentVideo.commentCount =
      videoResponse.data.items[0].statistics.commentCount
    responseDataCurrentVideo.uploadDate =
      videoResponse.data.items[0].snippet.publishedAt

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
