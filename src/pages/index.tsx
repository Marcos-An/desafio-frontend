import styles from '../styles/Home.module.scss'
import Card from '@components/atoms/Card'
import { useEffect, useState } from 'react'
import { getVideosOnSearch } from '@api/getVideosSearch'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { handleLoading, onChangeVideos } from '@redux/features/videos'
import { VideoInfoTreaded } from '@/types/videos'
import { SkeletonCard } from '@components/atoms/SkeletonCard'
import { loadingArray } from '@utils/data'

export default function Home() {
  const searchInput = useSelector((state: RootState) => state.search.value)
  const isLoading = useSelector((state: RootState) => state.videos.isLoading)
  const videos = useSelector((state: RootState) => state.videos.videosSearched)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(handleLoading(true))
    if (!videos.items.length && searchInput === '') {
      getVideosOnSearch(searchInput)
        .then((res) => {
          dispatch(onChangeVideos(res))
          dispatch(handleLoading(false))
        })
        .catch(() => dispatch(handleLoading(false)))
    }
  }, [])

  useEffect(() => {
    const fetchMoreItems = () => {
      getVideosOnSearch(searchInput, videos.nextPageToken).then((res) => {
        dispatch(onChangeVideos(res))
      })
    }

    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.offsetHeight
      const scrollTop = document.documentElement.scrollTop
      if (windowHeight + scrollTop >= documentHeight) {
        fetchMoreItems()
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.videoGrid}>
        {isLoading
          ? loadingArray.map((_, index) => <SkeletonCard key={index} />)
          : videos.items.map((video: VideoInfoTreaded, index) => (
              <Card video={video} key={index} />
            ))}
      </div>

      {videos.items.length === 0 && searchInput !== '' && !isLoading ? (
        <h3> Não encontramos resultados para essa pesquisa</h3>
      ) : null}
    </div>
  )
}
