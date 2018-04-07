import axios from 'axios'

Object.defineProperties(axios, {
  $context: {
    get () {
      return process.env.API_ROOT
    }
  }
})

const http = axios.create({
  baseURL: axios.$context
})

http.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      // switch (error.response.status) {
      //   case 500:
      //      1,
      //     break
      // }
    }
    return Promise.reject(error)
  }
)

export default http
