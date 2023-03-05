import { gapi } from '@api/axios'
import { VideoInfoTreaded } from '@/types/videos'
import { ResponseSearch } from '@/types/responseSearch'
import { ResponseVideos } from '@/types/responseVideos'
import axios from 'axios'
import { shuffle } from 'lodash'

export async function getRelatedVideos(
  videoId: string,
  maxResults: number
): Promise<VideoInfoTreaded[]> {
  try {
    const params = {
      relatedToVideoId: videoId,
      type: 'video',
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

    const channelResponse: ResponseSearch = await gapi
      .get('/channels', {
        params: {
          part: 'snippet',
          id: channelIds.join(',')
        }
      })
      .then(({ data }) => data)

    const videoData = videoResponse.items.map((item) => {
      const channelItem = channelResponse.items.find(
        (channel) => channel.id.toString() === item.snippet.channelId.toString()
      )
      return {
        videoId: item.id,
        nextPage: response.nextPageToken,
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

    return videoData
  } catch (error) {
    console.error(error)
    return []
  }
}
