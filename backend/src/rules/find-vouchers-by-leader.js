import { Voucher } from '../repositories'
import { statusesVoucher } from '../enums'

export async function findVouchersByLeader (login, donationId) {
  if (!donationId) {
    throw new Error('donationId is required')
  }
  console.log(login, donationId)

  const vouchers = (
    await Voucher.find({ donationId, leaderLogin: login })
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
