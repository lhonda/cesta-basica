const filterEntity = {
  vouchers: Voucher,
  donations: Donation,
  leaders: Leader,
  sites: Site
}

export function reportFilter (entity, filters) {
  return filterEntity[entity](filters)
}

function Voucher ({
  leaderName,
  siteId,
  status,
  listDonationId,
  state,
  city,
  dateTo,
  dateFrom
}) {
  return {
    leaderName,
    siteId,
    status,
    listDonationId,
    state,
    city,
    dateTo,
    dateFrom
  }
}

function Donation ({
  leaderName,
  siteId,
  status,
  listDonationId,
  state,
  city,
  dateTo,
  dateFrom
}) {
  return {
    leaderName,
    siteId,
    status,
    listDonationId,
    state,
    city,
    dateTo,
    dateFrom
  }
}

function Leader ({ name, siteName, state, city }) {
  return {
    name: verifyField(name),
    siteName: verifyField(siteName),
    state: verifyField(state),
    city: verifyField(city)
  }
}

function Site ({ state, city }) {
  return {
    state: verifyField(state),
    city: verifyField(city)
  }
}

function regexp (value, sign = '', opt) {
  return new RegExp(`${value}${sign}`, opt)
}

function verifyField (value) {
  return value ? regexp(value, '$', 'i') : regexp('^')
}
