import { Donation, Voucher } from '../repositories'

export async function endDonation ({ donationId }) {
  if (!donationId) {
    throw new Error('donationId is required')
  }

  const donation = await Donation.findOne({ donationId })
  const vouchers = await Voucher.findOne({ donationId, status: 1 })

  if (vouchers) {
    throw new Error('You can not finish this donation before changing all vouchers status')
  }

  donation.status = 4
  donation.completed = new Date()
  await donation.save()
}
