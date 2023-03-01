import axios from 'axios'

export const gapi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: 'AIzaSyDtMj3HvCIzKC0YtEXrZDVnVO-5hnSiGg8'
  }
})
