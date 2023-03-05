import React from 'react'
import { User } from 'phosphor-react'
import styles from './avatar.module.scss'

export const Avatar = () => {
  return (
    <div className={styles.avatar}>
      <User size={18} />
    </div>
  )
}
