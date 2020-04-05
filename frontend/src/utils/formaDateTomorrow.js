export const formatDateTomorrow = (date) => {
  const today = new Date(date)
  const hourNow = today.getTime()
  today.setTime(hourNow + 1000 * 60 * 60 * 24)
  return `${`0${today.getDate()}`.slice(-2)}/${`0${today.getMonth() + 1}`.slice(-2)}/${today.getFullYear()}`
}
