import styles from './skeletonCard.module.scss'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const SkeletonCard = () => {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <div className={styles.video}>
        <div className={styles.thumbnail}>
          <Skeleton height={200} borderRadius={15} />
        </div>
        <div className={styles.info}>
          <Skeleton />
          <Skeleton width={200} />
        </div>
      </div>
    </SkeletonTheme>
  )
}
