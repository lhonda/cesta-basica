import { Donation } from '../repositories'

export async function endDonation ({ donationId }) {
  const donate = await Donation.findOne({ donationId })

  if (!donationId) {
    throw new Error('donationId is required')
  }

  donate.status = 4

  await donate.save()

  return donate
}
