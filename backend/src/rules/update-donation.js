import { Donation } from '../repositories'

export async function updateDonation ({
  updatedBy,
  leaderLogin,
  siteId,
  donationId,
  quantity,
  sentDate
}) {
  if (!leaderLogin) {
    throw new Error('leaderLogin is required')
  }

  if (!siteId) {
    throw new Error('siteId is required')
  }

  if (!donationId) {
    throw new Error('donationId is required')
  }

  if (!quantity) {
    throw new Error('quantity is required')
  }

  if (!sentDate) {
    throw new Error('sentDate is required')
  }

  await Donation.findOneAndUpdate({ donationId }, {
    donationId,
    leaderLogin,
    adminLogin: updatedBy,
    siteId,
    quantity,
    status: 1,
    created: new Date(),
    sentDate
  })
}
