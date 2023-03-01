import styles from './card.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { VideoInfoTreaded } from '@/types/videos'
import { formatCounter, formatVideoTimePosted } from '@utils/format'

export default function Card({ video }: { video: VideoInfoTreaded }) {
  const router = useRouter()

  return (
    <div
      className={styles.videoContainer}
      onClick={() => router.push(`/watch/${video.videoId}`)}
    >
      <div className={styles.imageContainer}>
        <Image
          src={video.thumbnail}
          fill
          alt={'video'}
          sizes="(max-width: 500px) 100px"
          priority
        />
      </div>

      <div className={styles.content}>
        <div className={styles.chanelAvatarContainer}>
          <Image
            src={video.channelProfilePicture}
            fill
            alt={'thumb'}
            sizes="(max-width: 500px) 100px"
          />
        </div>
        <div>
          <p className={styles.title}>{video.title}</p>
          <p className={styles.chanel}> {video.channelName}</p>
          <p className={styles.chanel}>
            {`${formatCounter(video.videolikes)} visualizações - `}
            {formatVideoTimePosted(video.uploadDate)}
          </p>
        </div>
      </div>
    </div>
  )
}
