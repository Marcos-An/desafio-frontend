export const handleScroll = (callback: Function) => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.offsetHeight
  const scrollTop = document.documentElement.scrollTop

  if (windowHeight + scrollTop >= documentHeight) {
    callback()
  }
}
