import React from 'react'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './button.module.scss'

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isActive?: boolean
}

export const Button = ({ children, isActive, ...rest }: props) => {
  return (
    <button
      className={isActive ? styles.genericButtonActive : styles.genericButton}
      {...rest}
    >
      <p>{children}</p>
    </button>
  )
}
