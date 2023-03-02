import { gapi } from '@api/axios'
import { ChannelInfos } from '@/types/channel'

export async function getChannelInfos(
  id: string,
  maxResults: number = 20,
  nextPageToken: string = '',
  order = 'date'
): Promise<ChannelInfos> {
  try {
    const channelData = {} as ChannelInfos

    const channelResponse = await gapi
      .get('/channels', {
        params: {
          part: 'snippet, statistics',
          id: id,
          nextPageToken: nextPageToken
        }
      })
      .then(({ data }) => data.items[0])

    channelData.channelName = channelResponse.snippet.title
    channelData.customUrl = channelResponse.snippet.customUrl
    channelData.channelProfilePicture =
      channelResponse.snippet.thumbnails.default.url
    channelData.subscriberCount = channelResponse.statistics.subscriberCount

    const searchResponse = await gapi
      .get('/search', {
        params: {
          channelId: id,
          type: 'video',
          pageToken: nextPageToken,
          relevanceLanguage: 'pt-BR',
          order: order,
          maxResults: maxResults.toString()
        }
      })
      .then(({ data }) => data)

    const videoIds = searchResponse.items.map((item: any) => item.id.videoId)

    const videoResponse = await gapi
      .get('/videos?', {
        params: {
          part: 'snippet, statistics',
          id: videoIds.join(',')
        }
      })
      .then(({ data }) => data)

    const videoData = videoResponse.items.map((item: any) => {
      return {
        videoId: item.id,
        channelName: item.snippet.channelTitle,
        channelProfilePicture: channelResponse.snippet.thumbnails.default.url,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        views: item.statistics.viewCount,
        videolikes: item.statistics.likeCount,
        uploadDate: item.snippet.publishedAt
      }
    })

    channelData.videos = {
      items: videoData,
      nextPageToken: searchResponse.nextPageToken
    }

    return channelData
  } catch (error) {
    console.error(error)
    return {} as ChannelInfos
  }
}
