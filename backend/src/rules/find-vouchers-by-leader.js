import { Voucher } from '../repositories'
import { statusesVoucher } from '../enums'

export async function findVouchersByLeader (login, donationId) {
  if (!donationId) {
    throw new Error('A variável donationId deve ser preenchida')
  }

  console.log(login, donationId)

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
    receivedContactNumber,
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
    receivedContactNumber,
    point,
    status,
    statusText: statusesVoucher[status]
  }))

  return vouchers
}
