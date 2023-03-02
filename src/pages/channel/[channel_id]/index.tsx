import { getChannelInfos } from '@api/getChannelInfos'
import { VideoInfoTreaded } from '@/types/videos'
import { useEffect, useState } from 'react'
import styles from './channelPage.module.scss'
import { useRouter } from 'next/router'
import { ChannelInfos, Videos } from '@/types/channel'
import { formatCounter } from '@utils/format'
import Image from 'next/image'
import { VideoGridContainer } from '@components/atoms/VideoGridContainer'
import { loadingArray } from '@utils/data'
import { SkeletonCard } from '@components/atoms/Skeletons/SkeletonCard'
import Card from '@components/atoms/Card'
import { uniqBy } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Button } from '@components/atoms/Button'
import Head from 'next/head'

interface filterOptionsType {
  label: string
  order: string
  selected: boolean
}

export default function ChannelPage() {
  const router = useRouter()
  const [channelInfos, setChannelInfos] = useState<ChannelInfos>(
    {} as ChannelInfos
  )
  const [isLoading, setIsLoading] = useState(true)
  const [filterOptions, setFilterOptions] = useState<filterOptionsType[]>([
    {
      label: 'Enviados recentemente',
      order: 'date',
      selected: true
    },
    {
      label: 'Populares',
      order: 'relevance',
      selected: false
    }
  ])
  const handleIsLoading = (status: boolean) => {
    setIsLoading(status)
  }

  const handleFilterOption = (option: filterOptionsType) => {
    const newFilter = [...filterOptions]

    newFilter.forEach((currentOption) => {
      currentOption.selected = false
    })

    const filterData = newFilter.map((currentOption) => {
      if (currentOption.order === option.order) {
        return { ...currentOption, selected: true }
      }

      return currentOption
    })

    const selectedOption = filterData.filter((option) => option.selected)[0]

    getInfos(selectedOption.order)
    setFilterOptions([...filterData])
  }

  const { channel_id } = router.query

  const getInfos = (order = 'date') => {
    handleIsLoading(true)
    getChannelInfos(channel_id as string, 20, '', order)
      .then((info) => {
        setChannelInfos(info)
        handleIsLoading(false)
      })
      .catch(() => {
        handleIsLoading(false)
      })
  }

  useEffect(() => {
    if (channel_id) {
      getInfos()
    }
  }, [channel_id])

  const fetchMoreItems = () => {
    getChannelInfos(
      channel_id as string,
      24,
      channelInfos.videos.nextPageToken
    ).then((res) => {
      setChannelInfos((prev) => {
        const newVideos = {
          nextPageToken: res.videos.nextPageToken,
          items: uniqBy([...prev.videos.items, ...res.videos.items], 'videoId')
        }

        return {
          ...prev,
          videos: { ...newVideos }
        }
      })
    })
  }

  if (!channelInfos.channelName) {
    return null
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{channelInfos.customUrl}</title>
      </Head>
      <div className={styles.headerWrapper}>
        <div className={styles.infosWrapper}>
          <div className={styles.channelProfilePicture}>
            <Image
              src={channelInfos.channelProfilePicture}
              fill
              alt={'thumb'}
              sizes="100vw"
            />
          </div>
          <div className={styles.channelInfos}>
            <p className={styles.channelName}>{channelInfos.channelName}</p>
            <p className={styles.subscriberCount}>{channelInfos.customUrl}</p>
            <p className={styles.subscriberCount}>
              {formatCounter(channelInfos.subscriberCount)} inscritos
            </p>
          </div>
        </div>
      </div>

      <div className={styles.filterContainer}>
        {filterOptions.map((option) => (
          <Button
            key={option.label}
            isActive={option.selected}
            onClick={() => handleFilterOption(option)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <VideoGridContainer>
          {loadingArray.map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </VideoGridContainer>
      ) : (
        <InfiniteScroll
          className={styles.infiniteScroll}
          dataLength={channelInfos.videos.items.length}
          next={fetchMoreItems}
          hasMore={channelInfos.videos.nextPageToken !== ''}
          loader={null}
        >
          <VideoGridContainer>
            {channelInfos.videos.items.map((video: VideoInfoTreaded, index) => (
              <Card video={video} key={index} />
            ))}
          </VideoGridContainer>
        </InfiniteScroll>
      )}
    </div>
  )
}
