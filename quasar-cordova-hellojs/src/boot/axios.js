import axios from 'axios'

const $axios = axios.create({
  baseURL: `${process.env.API}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export { $axios }
