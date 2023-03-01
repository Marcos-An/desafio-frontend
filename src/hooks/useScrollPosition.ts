import { useState, useEffect } from 'react'

export function useScroll() {
  const [scrollPosition, setScrollPosition] = useState(window.pageYOffset)

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.pageYOffset)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollPosition
}
