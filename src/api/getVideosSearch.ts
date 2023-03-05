import { gapi } from '@api/axios'
import { VideosSearchedType } from '@/types/videos'
import { ResponseSearch } from '@/types/responseSearch'
import { ResponseChannels } from '@/types/responseChannels'
import { ResponseVideos } from '@/types/responseVideos'
import { shuffle } from 'lodash'
import axios from 'axios'

export async function getVideosOnSearch(
  query: string,
  nextPageToken = '',
  maxResults = 20
): Promise<VideosSearchedType> {
  try {
    const params = {
      q: query,
      type: 'video',
      regionCode: 'BR',
      pageToken: nextPageToken,
      relevanceLanguage: 'pt-BR',
      order: 'relevance',
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

    const response: ResponseSearch = await axios
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

    const videoIds = response.items.map((item) => item.id.videoId)

    const videoResponse: ResponseVideos = await gapi
      .get('/videos?', {
        params: {
          part: 'snippet,statistics',
          id: videoIds.join(','),
          regionCode: 'BR'
        }
      })
      .then(({ data }) => data)

    const channelIds = videoResponse.items.map((item) => item.snippet.channelId)

    const channelResponse: ResponseChannels = await gapi
      .get('/channels', {
        params: {
          part: 'snippet',
          id: channelIds.join(',')
        }
      })
      .then(({ data }) => data)

    const videoData = videoResponse.items.map((item) => {
      const channelItem = channelResponse.items.find(
        (channel) => channel.id === item.snippet.channelId
      )

      return {
        videoId: item.id,
        channelName: item.snippet.channelTitle,
        channelProfilePicture: channelItem?.snippet.thumbnails.default.url
          ? channelItem.snippet.thumbnails.default.url
          : '',
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        views: Number(item.statistics.viewCount),
        videolikes: Number(item.statistics.likeCount),
        uploadDate: item.snippet.publishedAt
      }
    })

    return {
      nextPageToken: response.nextPageToken,
      items: videoData
    }
  } catch (error) {
    console.error(error)
    return {} as VideosSearchedType
  }
}
