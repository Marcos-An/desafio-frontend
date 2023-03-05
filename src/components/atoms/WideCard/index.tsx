import React from 'react'
import styles from './wideCard.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { VideoInfoTreaded } from '@/types/videos'
import { formatCounter, formatVideoTimePosted } from '@utils/format'

export default function WideCard({ video }: { video: VideoInfoTreaded }) {
  const router = useRouter()

  return (
    <div
      className={styles.videoContainer}
      onClick={() => router.push(`/watch/${video.videoId}`)}
    >
      <div className={styles.imageContainer}>
        <Image src={video.thumbnail} fill alt={'video'} sizes="100vw" />
      </div>

      <div className={styles.content}>
        <p className={styles.title}>{video.title}</p>
        <p className={styles.channel}> {video.channelName}</p>
        <p className={styles.channel}>
          {`${formatCounter(video.videolikes)} visualizações - `}
          {formatVideoTimePosted(video.uploadDate)}
        </p>
      </div>
    </div>
  )
}
