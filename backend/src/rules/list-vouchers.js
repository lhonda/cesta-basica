import { Voucher } from '../repositories'

export async function listVouchers({ login }) {
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
    point
  }) => ({
    voucherId,
    donationId,
    leaderLogin,
    voucherContent,
    created,
    delivered,
    receivedCpf,
    receivedName,
    point
  }))

  return vouchers
}
