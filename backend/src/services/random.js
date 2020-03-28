export function password () {
  return Math.round(Math.random() * 1000000000000).toString().slice(0, 8)
}

export function longid () {
  return Math.round(Math.random() * 100000000000000000).toString().slice(0, 8)
}
