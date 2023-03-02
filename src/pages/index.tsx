import styles from '../styles/Home.module.scss'
import Card from '@components/atoms/Card'
import { useEffect, useState } from 'react'
import { getVideosOnSearch } from '@api/getVideosSearch'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { onChangeVideos } from '@redux/features/videos'
import { VideoInfoTreaded } from '@/types/videos'
import { SkeletonCard } from '@components/atoms/Skeletons/SkeletonCard'
import { loadingArray } from '@utils/data'
import Head from 'next/head'
import { VideoGridContainer } from '@components/atoms/VideoGridContainer'
import { handleScroll } from '@utils/handleScroll'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function Home() {
  const searchInput = useSelector((state: RootState) => state.search.value)
  const [isLoading, setIsLoading] = useState(true)
  const videos = useSelector((state: RootState) => state.videos.videosSearched)
  const dispatch = useDispatch()

  const handleIsLoading = (status: boolean) => {
    setIsLoading(status)
  }

  useEffect(() => {
    if (!videos.items.length && searchInput === '') {
      handleIsLoading(true)
      getVideosOnSearch(searchInput)
        .then((res) => {
          dispatch(onChangeVideos(res))
          handleIsLoading(false)
        })
        .catch(() => handleIsLoading(false))
    }
  }, [])

  const fetchMoreItems = () => {
    getVideosOnSearch(searchInput, videos.nextPageToken, 20).then((res) => {
      dispatch(onChangeVideos(res))
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>YouTube</title>
      </Head>
      {isLoading ? (
        <VideoGridContainer>
          {loadingArray.map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </VideoGridContainer>
      ) : (
        <InfiniteScroll
          className={styles.infiniteScroll}
          dataLength={videos.items.length}
          next={fetchMoreItems}
          hasMore={videos.nextPageToken !== ''}
          loader={null}
        >
          <VideoGridContainer>
            {videos.items.map((video: VideoInfoTreaded, index) => (
              <Card video={video} key={index} />
            ))}
          </VideoGridContainer>
        </InfiniteScroll>
      )}

      {videos.items.length === 0 && searchInput !== '' && !isLoading ? (
        <h3> Não encontramos resultados para essa pesquisa</h3>
      ) : null}
    </div>
  )
}
