import React from 'react'
import styles from './descriptionBox.module.scss'
import {
  formatCounter,
  formatDate,
  formatDescriptionWithLink,
  formatVideoDescription
} from '@utils/format'

interface props {
  viewCount: number
  uploadDate: string
  description: string
  handleSeeLess: () => void
  isSeeLess: boolean
}

export const DescriptionBox = ({
  viewCount,
  uploadDate,
  description,
  handleSeeLess,
  isSeeLess
}: props) => {
  return (
    <div className={styles.descriptionBoxContainer}>
      <div className={styles.counterInfos}>
        <p>{formatCounter(viewCount)} visualizações</p>
        <p>{formatDate(uploadDate)}</p>
      </div>

      <div className={styles.description}>
        {isSeeLess ? (
          <div
            dangerouslySetInnerHTML={{
              __html: formatDescriptionWithLink(
                formatVideoDescription(description)
              )
            }}
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: formatDescriptionWithLink(description)
            }}
          />
        )}
      </div>

      <span className={styles.seeMoreButton} onClick={handleSeeLess}>
        Mostrar {isSeeLess ? 'mais' : 'menos'}
      </span>
    </div>
  )
}
