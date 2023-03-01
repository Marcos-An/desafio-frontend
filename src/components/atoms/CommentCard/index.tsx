import {
  formatDescriptionWithLink,
  formatVideoDescription,
  formatVideoTimePosted
} from '@utils/format'
import Image from 'next/image'
import { ThumbsUp } from 'phosphor-react'
import styles from './commentCard.module.scss'

interface prop {
  authorDisplayName: string
  authorProfileImageUrl: string
  comment: string
  likeCount: number
  updatedAt: string
}

export const CommentCard = ({
  authorDisplayName,
  authorProfileImageUrl,
  comment,
  likeCount,
  updatedAt
}: prop) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.profilePicture}>
          <Image src={authorProfileImageUrl} fill alt={'thumb'} sizes="100vw" />
        </div>
        <div className={styles.commentWrapper}>
          <h4>
            {authorDisplayName} <span>{formatVideoTimePosted(updatedAt)}</span>
          </h4>

          <p
            dangerouslySetInnerHTML={{
              __html: comment
            }}
          />
        </div>
      </div>

      <div className={styles.likesContainer}>
        <ThumbsUp size={18} />
        <span>{likeCount}</span>
      </div>
    </div>
  )
}
