import { status } from './status'
import { chooseCity, chooseState, chooseStatus, chooseSite } from './strings'

export function formatCities(data) {
  const formatedCities = data.map((item) => ({
    value: item.city,
    string: item.city,
  }))
  formatedCities.unshift({ value: chooseCity, string: chooseCity })
  return formatedCities
}

export function formatStates(data) {
  const formatedState = data
    .map((item) => ({
      value: item.state,
      string: item.state,
    }))
    .sort((a, b) => {
      const nameA = a.string.toUpperCase()
      const nameB = b.string.toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })

  formatedState.unshift({ value: chooseState, string: chooseState })
  return formatedState
}

export function formatStatus() {
  const formatedStatus = []
  formatedStatus.push({ value: chooseStatus, string: chooseStatus })
  formatedStatus.push({ value: status.ESPERANDO_RECEBIMENTO.id, string: status.ESPERANDO_RECEBIMENTO.status })
  formatedStatus.push({ value: status.ENTREGUE_LIDER.id, string: status.ENTREGUE_LIDER.status })
  formatedStatus.push({ value: status.ENTREGANDO.id, string: status.ENTREGANDO.status })
  return formatedStatus
}

export function formatSites(data) {
  const formatedState = data
    .map((item) => ({
      value: item.id,
      string: item.name,
    }))
    .sort((a, b) => {
      const nameA = a.string.toUpperCase()
      const nameB = b.string.toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })

  formatedState.unshift({ value: chooseSite, string: chooseSite })
  return formatedState
}
