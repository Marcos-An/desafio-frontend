import axios from 'axios'

export const gapi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: process.env.NEXT_PUBLIC_API_KEY
  }
})
