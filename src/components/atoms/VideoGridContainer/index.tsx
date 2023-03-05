import React from 'react'
import styles from './videoGridContainer.module.scss'
import { ReactNode } from 'react'

export const VideoGridContainer = ({ children }: { children: ReactNode }) => {
  return <div className={styles.videoGrid}>{children}</div>
}
