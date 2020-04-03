import { findVouchersByAdmin } from './find-vouchers-by-admin'
import { findVouchersByLeader } from './find-vouchers-by-leader'

export async function findVouchersByUser ({ role, login, donationId }) {
  return role === 'admin'
    ? findVouchersByAdmin(donationId)
    : findVouchersByLeader(login, donationId)
}
