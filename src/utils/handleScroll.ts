export const handleScroll = (
  callback = () => {
    return {}
  }
) => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.offsetHeight
  const scrollTop = document.documentElement.scrollTop

  if (windowHeight + scrollTop >= documentHeight) {
    callback()
  }
}
