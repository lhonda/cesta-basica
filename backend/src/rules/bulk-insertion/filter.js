import filterUsers from './user/filter'
import filterDonation from './donation/filter'
import filterVoucher from './voucher/filter'
import filterSite from './site/filter'

const filter = {
  user: filterUsers,
  donation: filterDonation,
  voucher: filterVoucher,
  site: filterSite
}

export function filterFile (data, type) {
  return filter[type] ? filter[type](data) : ''
}
