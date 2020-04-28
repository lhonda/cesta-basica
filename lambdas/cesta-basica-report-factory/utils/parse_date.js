const moment = require('moment')

module.exports = date => {
  if (!date) return ""
  return moment(date).format("DD/MM/YYYY HH:mm")
}