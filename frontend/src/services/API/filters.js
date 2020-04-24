import { types } from '../../store'

export function setFilters(dispatch, filters = {}) {
  const filterQnt = sumFilterQntd(filters)
  dispatch({ type: types.SET_FILTERS, payload: { ...filters, filterQnt } })
}

function sumFilterQntd(filters) {
  let qntd = 0
  const { leaderName, siteId, status, listDonationId, state, city, dateTo, dateFrom } = filters

  if (leaderName !== '') {
    qntd += 1
  }
  if (siteId !== '') {
    qntd += 1
  }
  if (status !== '') {
    qntd += 1
  }
  if (listDonationId.length !== 0) {
    qntd += 1
  }
  if (state !== '') {
    qntd += 1
  }
  if (city !== '') {
    qntd += 1
  }
  if (dateTo !== '') {
    qntd += 1
  }
  if (dateFrom !== '') {
    qntd += 1
  }
  return qntd
}
