import { gapi } from '@api/axios'
import { ChannelInfos } from '@/types/channel'
import { ResponseSearch } from '@/types/responseSearch'
import { ResponseVideosItems } from '@/types/responseVideos'
import axios from 'axios'
import { shuffle } from 'lodash'

export async function getChannelInfos(
  id: string,
  maxResults = 20,
  nextPageToken = '',
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

    const params = {
      channelId: id,
      type: 'video',
      pageToken: nextPageToken,
      relevanceLanguage: 'pt-BR',
      order: order,
      maxResults: (maxResults / 2).toString()
    }
    const longParams = {
      ...params,
      videoDuration: 'long'
    }
    const mediumParams = {
      ...params,
      videoDuration: 'medium'
    }

    const searchResponse: ResponseSearch = await axios
      .all([
        gapi.get('/search', { params: mediumParams }),
        gapi.get('/search', { params: longParams })
      ])
      .then((responses) => {
        const longVideos = responses[0].data.items
        const mediumVideos = responses[1].data.items
        const allVideos = shuffle(longVideos.concat(mediumVideos))

        return {
          ...responses[0].data,
          items: [...allVideos]
        }
      })

    const videoIds = searchResponse.items.map((item) => item.id.videoId)

    const videoResponse = await gapi
      .get('/videos?', {
        params: {
          part: 'snippet, statistics',
          id: videoIds.join(',')
        }
      })
      .then(({ data }) => data)

    const videoData = videoResponse.items.map((item: ResponseVideosItems) => {
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
