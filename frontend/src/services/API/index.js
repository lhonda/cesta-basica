import axios from 'axios'

export const Api = axios.create({
  baseURL: process.env.REACT_APP_APIHOST,
})

export function setToken(token) {
  if (token) {
    Api.defaults.headers['x-access-token'] = token
  }
}
