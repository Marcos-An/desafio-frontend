import styles from './header.module.scss'
import Image from 'next/image'
import logo from '@images/assets/images/YouTube_Logo.svg'
import { InputSearch } from '@components/molecules/InputSearch'
import { Avatar } from '@components/atoms/Avatar'
import { useRouter } from 'next/router'

export const Header = () => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          alt="logo"
          src={logo}
          onClick={() => router.push('/')}
          width={90}
          height={20}
          priority
        />
        <InputSearch />
        <Avatar />
      </div>
    </div>
  )
}
