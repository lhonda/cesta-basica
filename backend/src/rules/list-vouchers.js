import { Voucher } from '../repositories'
import { statusesVoucher } from '../enums'

export async function listVouchers ({ login }) {
  console.log(arguments)
  const vouchers = (
    await Voucher.find({ leaderLogin: login })
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
