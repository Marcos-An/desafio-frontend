import styles from './skeletonCard.module.scss'
import Skeleton from 'react-loading-skeleton'

export const SkeletonCard = () => {
  return (
    <div className={styles.video}>
      <div className={styles.thumbnail}>
        <Skeleton height={200} borderRadius={15} />
      </div>
      <div className={styles.info}>
        <Skeleton />
        <Skeleton width={200} />
      </div>
    </div>
  )
}
