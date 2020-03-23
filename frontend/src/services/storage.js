const set = (key, value) => localStorage.setItem(key, JSON.stringify(value))
const clear = (key) => this.set(key, undefined)
function get(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (err) {
    return undefined
  }
}

export const user = {
  key: '_user',
  set: (data) => set(this.key, data),
  get: () => get(this.key),
  clear: () => clear(this.key),
}

export const token = {
  key: '_token',
  set: (data) => set(this.key, data),
  get: () => get(this.key),
  clear: () => clear(this.key),
}
