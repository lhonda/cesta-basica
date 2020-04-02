function formatTime(time) {
  return time < 10 ? `0${time}` : time
}

export const formatHour = (date) => {
  date = new Date()
  return `${`${formatTime(date.getHours())}`}h${formatTime(date.getMinutes())}`
}
