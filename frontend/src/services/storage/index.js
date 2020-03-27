import { keys } from './storageKeys'

export const set = (value) => localStorage.setItem(keys.GLOBAL_STORE, JSON.stringify(value))
export const clear = () => localStorage.setItem(keys.GLOBAL_STORE, null)
export function get() {
  try {
    return JSON.parse(localStorage.getItem(keys.GLOBAL_STORE))
  } catch (err) {
    return undefined
  }
}

export function setExpiresCheckList() {
  const twentyFourHoursInMs = 86400000
  const timeOfExpires = new Date().getTime() + twentyFourHoursInMs
  localStorage.setItem(keys.CHECK_LIST, timeOfExpires)
}

export function checkExpiresCheckList() {
  return new Date().getTime() < localStorage.getItem(keys.CHECK_LIST)
}
