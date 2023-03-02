import axios from 'axios'

export const gapi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: 'AIzaSyBC2EID4EAnxt8daAfMn8Di8QqRuXSmYLk'
  }
})
