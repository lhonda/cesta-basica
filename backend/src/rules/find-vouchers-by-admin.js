import { Voucher } from '../repositories'
import { statusesVoucher } from '../enums'

export async function findVouchersByAdmin (donationId) {
  if (!donationId) {
    throw new Error('donationId is required')
  }

  const vouchers = (
    await Voucher.find({ donationId })
  ).map(({
    voucherId,
    donationId,
    leaderLogin,
    voucherContent,
    leaderComment,
    created,
    delivered,
    receivedCpf,
    receivedName,
    point,
    status
  }) => ({
    voucherId,
    donationId,
    leaderLogin,
    voucherContent,
    leaderComment,
    created,
    delivered,
    receivedCpf,
    receivedName,
    point,
    status,
    statusText: statusesVoucher[status]
  }))

  return vouchers
}
