import React from 'react'
import { getVideoInfos } from '@api/getVideoInfos'
import { YouTubePlayer } from '@components/atoms/YouTubePlayer'
import { CurrentVideoInfo, VideoInfoTreaded } from '@/types/videos'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from './videoPage.module.scss'
import { formatCounter, formatNumber } from '@utils/format'
import Head from 'next/head'
import { ThumbsUp } from 'phosphor-react'
import { DescriptionBox } from '@components/molecules/DescriptionBox'
import { CommentCard } from '@components/atoms/CommentCard'
import { getRelatedVideos } from '@api/getRelatedVideos'
import WideCard from '@components/atoms/WideCard'
import { useWindowWidth } from '@hooks/useWindowWidth'
import Card from '@components/atoms/Card'

export default function VideoPage() {
  const router = useRouter()
  const [isSeeLess, setIsSeeLess] = useState(true)
  const [videoInfo, setVideoInfos] = useState<CurrentVideoInfo>(
    {} as CurrentVideoInfo
  )
  const [relatedVideos, setRelatedVideos] = useState<VideoInfoTreaded[]>()
  const windowWidth = useWindowWidth()

  const { video_id } = router.query
  useEffect(() => {
    if (video_id) {
      getVideoInfos(video_id as string).then((res) => {
        setVideoInfos(res)
      })

      getRelatedVideos(video_id as string, 16).then((res) => {
        setRelatedVideos(res)
      })
    }
  }, [video_id])

  const handleSeeLess = () => {
    setIsSeeLess(!isSeeLess)

    if (!isSeeLess) {
      window.scrollTo(0, 0)
    }
  }
  const goToChannel = () => {
    router.push(`/channel/${videoInfo.currentVideo.channelId}`)
  }

  if (!videoInfo.currentVideo) {
    return null
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{videoInfo.currentVideo.title}</title>
      </Head>
      <div>
        <div className={styles.player}>
          <YouTubePlayer videoId={video_id as string} />
        </div>
        <div className={styles.channelInfoContainer}>
          <h5 className={styles.title} data-testid="video-title">
            {videoInfo.currentVideo.title}
          </h5>
          <div className={styles.infosWrapper}>
            <div className={styles.channelProfilePicture} onClick={goToChannel}>
              <Image
                src={videoInfo.currentVideo.channelProfilePicture}
                fill
                alt={'thumb'}
                sizes="100vw"
              />
            </div>
            <div className={styles.channelInfos}>
              <p
                className={styles.channelName}
                onClick={goToChannel}
                data-testid="channel-title"
              >
                {videoInfo.currentVideo.channelName}
              </p>
              <span className={styles.subscriberCount}>
                {formatCounter(videoInfo.currentVideo.subscriberCount)}{' '}
                inscritos
              </span>
            </div>

            <span className={styles.likesCount}>
              <ThumbsUp size={20} weight="fill" />
              {formatCounter(videoInfo.currentVideo.likeCount)}
            </span>
          </div>

          <DescriptionBox
            viewCount={videoInfo.currentVideo.viewCount}
            uploadDate={videoInfo.currentVideo.uploadDate}
            description={videoInfo.currentVideo.description}
            handleSeeLess={handleSeeLess}
            isSeeLess={isSeeLess}
          />
        </div>
        <br />

        {windowWidth <= 450 && (
          <div className={styles.videosWrapper}>
            <br />
            {relatedVideos?.length &&
              relatedVideos.map((relatedVideo: VideoInfoTreaded) => (
                <Card video={relatedVideo} key={relatedVideo.videoId} />
              ))}
            <br />
          </div>
        )}

        {windowWidth > 450 && windowWidth < 1023 && (
          <div className={styles.videosWrapper}>
            {relatedVideos?.length &&
              relatedVideos.map((relatedVideo: VideoInfoTreaded) => (
                <WideCard video={relatedVideo} key={relatedVideo.videoId} />
              ))}
            <br />
          </div>
        )}
        <div className={styles.commentsWrapper} data-testid="comments-wrapper">
          <p>{formatNumber(videoInfo.currentVideo.commentCount)} Comentários</p>
          <br />
          {videoInfo.comments.map((comment) => (
            <CommentCard
              key={comment.updatedAt}
              authorDisplayName={comment.authorDisplayName}
              authorProfileImageUrl={comment.authorProfileImageUrl}
              comment={comment.comment}
              likeCount={comment.likeCount}
              updatedAt={comment.updatedAt}
            />
          ))}
        </div>
      </div>

      {windowWidth >= 1023 && (
        <div>
          {relatedVideos?.length &&
            relatedVideos.map((relatedVideo: VideoInfoTreaded) => (
              <WideCard video={relatedVideo} key={relatedVideo.videoId} />
            ))}
        </div>
      )}
    </div>
  )
}
