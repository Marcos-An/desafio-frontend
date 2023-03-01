import styles from '../styles/Home.module.scss'
import Card from '@components/atoms/Card'
import { useEffect } from 'react'
import { getVideosOnSearch } from '@api/getVideosSearch'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { onChangeVideos } from '@redux/features/videos'
import { VideoInfoTreaded } from '@/types/videos'

export default function Home() {
  const searchInput = useSelector((state: RootState) => state.search.value)
  const videos = useSelector((state: RootState) => state.videos.videosSearched)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!videos.items.length && searchInput === '') {
      getVideosOnSearch(searchInput).then((res) => {
        dispatch(onChangeVideos(res))
      })
    }
  }, [])

  useEffect(() => {
    if (videos.items.length && videos.nextPageToken) {
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
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [videos])

  return (
    <div className={styles.container}>
      <div className={styles.videoGrid}>
        {videos.items.map((video: VideoInfoTreaded, index) => (
          <Card video={video} key={index} />
        ))}
      </div>

      {videos.items.length === 0 && searchInput !== '' && (
        <h3> Não encontramos resultados para essa pesquisa</h3>
      )}
    </div>
  )
}
