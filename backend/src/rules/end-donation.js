import { Donation } from '../repositories'

export async function endDonation ({ donationId }) {
  if (!donationId) {
    throw new Error('donationId is required')
  }

  const donation = await Donation.findOne({ donationId })

  donation.status = 4
  donation.completed = new Date()
  await donation.save()

  return
}
