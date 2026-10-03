import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})
