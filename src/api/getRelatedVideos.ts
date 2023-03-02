import { gapi } from '@api/axios'
import { VideoInfoTreaded } from '@/types/videos'

export async function getRelatedVideos(
  videoId: string,
  maxResults: number = 16
): Promise<VideoInfoTreaded[]> {
  try {
    const response = await gapi
      .get('/search', {
        params: {
          relatedToVideoId: videoId,
          type: 'video',
          maxResults: maxResults.toString()
        }
      })
      .then(({ data }) => data)

    const videoIds = response.items.map((item: any) => item.id.videoId)

    const videoResponse = await gapi
      .get('/videos?', {
        params: {
          part: 'snippet,statistics',
          id: videoIds.join(','),
          regionCode: 'BR'
        }
      })
      .then(({ data }) => data)

    const channelIds = videoResponse.items.map(
      (item: any) => item.snippet.channelId
    )

    const channelResponse = await gapi
      .get('/channels', {
        params: {
          part: 'snippet',
          id: channelIds.join(',')
        }
      })
      .then(({ data }) => data)

    const videoData = videoResponse.items.map((item: any) => {
      const channelItem = channelResponse.items.find(
        (channel: any) => channel.id === item.snippet.channelId
      )

      return {
        videoId: item.id,
        nextPage: response.nextPageToken,
        channelName: item.snippet.channelTitle,
        channelProfilePicture: channelItem.snippet.thumbnails.default.url,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        views: item.statistics.viewCount,
        videolikes: item.statistics.likeCount,
        uploadDate: item.snippet.publishedAt
      }
    })

    return videoData
  } catch (error) {
    console.error(error)
    return []
  }
}
