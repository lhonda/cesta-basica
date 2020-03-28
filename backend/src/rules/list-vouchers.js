import { Voucher } from '../repositories'
import { statusesVoucher } from '../enums'

export async function listVouchers ({ login, donationId }) {
  console.log(arguments)

  if (!login) {
    throw new Error('login is required')
  }

  if (!donationId) {
    throw new Error('donationId is required')
  }

  const vouchers = (
    await Voucher.find({ donationId, leaderLogin: login })
  ).map(({
    voucherId,
    donationId,
    leaderLogin,
    voucherContent,
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
    created,
    delivered,
    receivedCpf,
    receivedName,
    point,
    status,
    statusText: statusesVoucher[status]
  }))

  console.log(vouchers)

  return vouchers
}
