import axios from 'axios'

export const Api = axios.create({
  baseURL: 'https://cesta-basica-covid.herokuapp.com',
})
