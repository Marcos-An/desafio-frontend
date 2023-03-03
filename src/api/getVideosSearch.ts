import { gapi } from '@api/axios'
import { VideosSearchedType } from '@/types/videos'

export async function getVideosOnSearch(
  query: string,
  nextPageToken: string = '',
  maxResults: number = 20
): Promise<VideosSearchedType> {
  try {
    const response = await gapi.get('/search', {
      params: {
        q: query,
        type: 'video',
        regionCode: 'BR',
        pageToken: nextPageToken,
        relevanceLanguage: 'pt-BR',
        order: 'relevance',
        maxResults: maxResults.toString()
      }
    })
    const videoIds = response.data.items.map((item: any) => item.id.videoId)

    const videoResponse = await gapi.get('/videos?', {
      params: {
        part: 'snippet,statistics',
        id: videoIds.join(','),
        regionCode: 'BR'
      }
    })

    const channelIds = videoResponse.data.items.map(
      (item: any) => item.snippet.channelId
    )

    const channelResponse = await gapi.get('/channels', {
      params: {
        part: 'snippet',
        id: channelIds.join(',')
      }
    })

    const videoData = videoResponse.data.items.map((item: any) => {
      const channelItem = channelResponse.data.items.find(
        (channel: any) => channel.id === item.snippet.channelId
      )

      return {
        videoId: item.id,
        channelName: item.snippet.channelTitle,
        channelProfilePicture: channelItem.snippet.thumbnails.default.url,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        views: item.statistics.viewCount,
        videolikes: item.statistics.likeCount,
        uploadDate: item.snippet.publishedAt
      }
    })

    return {
      nextPageToken: response.data.nextPageToken,
      items: videoData
    }
  } catch (error) {
    console.error(error)
    return {} as VideosSearchedType
  }
}
