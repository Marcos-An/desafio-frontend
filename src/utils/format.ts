import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears
} from 'date-fns'

export function formatCounter(num: number): string {
  if (num < 1000) {
    return num.toString()
  }

  if (num < 999999) {
    return `${(num / 1000).toFixed(1)} mil`.replace('.', ',')
  }

  return `${(num / 1000000).toFixed(0)} mi`.replace('.', ',')
}

export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function formatDate(dateString: string): string {
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez'
  ]

  const date = new Date(dateString)
  if (!!date.getFullYear()) {
    const year = date.getFullYear()
    const month = months[date.getMonth()]
    const day = date.getDate()
    return `${day} ${month} ${year}`
  }

  return 'Invalid Date'
}

export function formatVideoTimePosted(date: string): string {
  const publishedAt = new Date(date)
  const now = new Date()

  if (publishedAt > now) {
    return 'Invalid Date'
  }

  const seconds = Math.abs(differenceInSeconds(publishedAt, now))
  const minutes = Math.abs(differenceInMinutes(publishedAt, now))
  const hours = Math.abs(differenceInHours(publishedAt, now))
  const days = Math.abs(differenceInDays(publishedAt, now))
  const months = Math.abs(differenceInMonths(publishedAt, now))
  const years = Math.abs(differenceInYears(publishedAt, now))

  if (years > 0) {
    return `hà ${years} ${years === 1 ? 'ano' : 'anos'}`
  }

  if (months > 0) {
    return `hà ${months} ${months === 1 ? 'mes' : 'meses'}`
  }

  if (days > 0) {
    return `hà ${days} ${days === 1 ? 'dia' : 'dias'}`
  }

  if (hours > 0) {
    return `hà ${hours} ${hours === 1 ? 'hora' : 'horas'}`
  }

  if (minutes > 0) {
    return `hà ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`
  }

  return `hà ${seconds} segundos`
}

export function formatVideoDescription(description: string): string {
  const maxChars = 150
  const trimmedDescription = description.trim().substring(0, maxChars)
  const lastSpaceIndex = trimmedDescription.lastIndexOf(' ')
  const formattedDescription =
    trimmedDescription.substring(0, lastSpaceIndex) + ' ...'
  return formattedDescription
}

export function formatDescriptionWithLink(text: string): string {
  const urlRegex = /(https?:\/\/[^\s]+)|(#[^\s]+)|(@[^\s]+)/g

  const paragraphs = text.split('\n')

  const formattedParagraphs = paragraphs.map((paragraph) => {
    const urls = paragraph.match(urlRegex)

    if (!urls) {
      return `<p>${paragraph}</p>`
    }
    let formattedParagraph = paragraph
    urls.forEach((url) => {
      const link = `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
      formattedParagraph = formattedParagraph.replace(url, link)
    })

    return `<p>${formattedParagraph}</p>`
  })

  const formattedText = formattedParagraphs.join('')

  return formattedText
}
