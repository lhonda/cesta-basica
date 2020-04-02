function formatTime(time) {
  return time < 10 ? `0${time}` : time
}

export const formatHour = (date) => {
  const time = new Date(date)
  return `${formatTime(time.getHours())}h${formatTime(time.getMinutes())}`
}
