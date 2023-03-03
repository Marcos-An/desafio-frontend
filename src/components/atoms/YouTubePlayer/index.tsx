import React from 'react'
import YouTube from 'react-youtube'
import styles from './youTubePlayer.module.scss'
interface props {
  videoId: string
}

export const YouTubePlayer = ({ videoId }: props) => {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1
    }
  }

  return (
    <YouTube videoId={videoId} opts={opts} className={styles.youTubePlayer} />
  )
}
