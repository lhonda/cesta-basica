import { Donation, Voucher } from '../repositories'

export async function endDonation ({ donationId }) {
  if (!donationId) {
    throw new Error('donationId is required')
  }

  const donation = await Donation.findOne({ donationId })

  const vouchers = await Voucher.find({ donationId, status: 3 })

  if (vouchers) {
    return vouchers
  }

  donation.status = 4
  donation.completed = new Date()
  await donation.save()
}
