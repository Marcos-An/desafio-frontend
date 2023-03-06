import {
  formatCounter,
  formatNumber,
  formatDate,
  formatVideoDescription,
  formatDescriptionWithLink
} from '../../src/utils/format'

describe('Utils tests', () => {
  describe('formatCounter', () => {
    it('should return the number smaller then 1000 just as string', () => {
      const result = formatCounter(950)

      expect(typeof result).toEqual('string')
    })

    it('should return the number smaller then 1000000 formated', () => {
      expect(formatCounter(1900)).toEqual('1,9 mil')
      expect(formatCounter(2000)).toEqual('2 mil')
      expect(formatCounter(1000000)).toEqual('1 mi')
    })
  })

  describe('formatNumber', () => {
    it('should format number to add commas and dots', () => {
      expect(formatNumber(10000)).toEqual('10,000')
      expect(formatNumber(1000)).toEqual('1,000')
      expect(formatNumber(100.45)).toEqual('100.45')
      expect(formatNumber(100.0)).toEqual('100')
    })
  })

  describe('formatDate', () => {
    it('should format date to add mouth', () => {
      expect(formatDate('12/12/2022')).toEqual('12 Dez 2022')
      expect(
        formatDate(
          'Sat Nov 30 1996 21:00:00 GMT-0300 (Horário de Verão do Amazonas)'
        )
      ).toEqual('30 Nov 1996')
      expect(formatDate('20/dez/2022')).toEqual('Invalid Date')
      expect(formatDate('teste')).toEqual('Invalid Date')
    })
  })

  describe('formatVideoDescription', () => {
    const text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in aliquet massa, et fringilla nisi. Vivamus metus tellus, dignissim at ante a, tincidunt pulvinar tellus. Nullam porta tincidunt odio quis elementum. Nulla in ultrices velit, ac cursus risus. Aenean blandit diam nec nunc ultricies fringilla. Pellentesque sed mauris at eros sodales sodales sit amet non sapien. Phasellus scelerisque a ligula non ultrices. Maecenas ultrices placerat risus, et pulvinar elit. Nunc mollis nunc eu varius sollicitudin.'

    const result =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in aliquet massa, et fringilla nisi. Vivamus metus tellus, dignissim at ante a, ...'

    it('should format text', () => {
      console.log(formatVideoDescription(text))
      expect(formatVideoDescription(text)).toEqual(result)
    })
  })

  describe('formatDescriptionWithLink', () => {
    const text =
      'olá, vamos testar o formatDescription \n https://www.google.com  deve estar dentro de um "<a></a>"'

    const result =
      '<p>olá, vamos testar o formatDescription </p><p> <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">https://www.google.com</a>  deve estar dentro de um "<a></a>"</p>'

    it('should format text with links', () => {
      console.log(formatDescriptionWithLink(text))
      expect(formatDescriptionWithLink(text)).toEqual(result)
    })
  })
})

export {}
