import React from 'react'
import styles from './home.module.scss'
import Card from '@components/atoms/Card'
import { useEffect } from 'react'
import { getVideosOnSearch } from '@api/getVideosSearch'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { handleLoading, onChangeVideos } from '@redux/features/videos'
import { VideoInfoTreaded } from '@/types/videos'
import { SkeletonCard } from '@components/atoms/Skeletons/SkeletonCard'
import { loadingArray } from '@utils/data'
import Head from 'next/head'
import { VideoGridContainer } from '@components/atoms/VideoGridContainer'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function Home() {
  const searchInput = useSelector((state: RootState) => state.search.value)
  const isLoading = useSelector((state: RootState) => state.videos.isLoading)
  const videos = useSelector((state: RootState) => state.videos.videosSearched)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!videos.items.length && searchInput === '') {
      dispatch(handleLoading(true))
      getVideosOnSearch(searchInput)
        .then((res) => {
          dispatch(onChangeVideos(res))
          dispatch(handleLoading(false))
        })
        .catch(() => dispatch(handleLoading(false)))
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
        <h3 className={styles.noFindText}>
          {' '}
          Não encontramos resultados para essa pesquisa
        </h3>
      ) : null}
    </div>
  )
}
