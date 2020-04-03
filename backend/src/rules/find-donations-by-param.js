import { Donation } from '../repositories'

export async function findDonationsByParam (donationId) {
  if (!donationId) {
    throw new Error('donationId is required')
  }

  const donations = (await Donation.find({ donationId: new RegExp(`^${donationId}`) }, { donationId: 1 })
  ).map(({ donationId }) => ({ donationId }))

  return donations
}
