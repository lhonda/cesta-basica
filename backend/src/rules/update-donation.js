import { Donation } from '../repositories'

export async function updateDonation (
  login,
  leaderLogin,
  siteId,
  donationId,
  quantity,
  sentDate
) {
  console.log(donationId)
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

  const donation = await Donation.findOne({ donationId })
  const timestamp = new Date()

  if (!donation) {
    throw new Error('This donationId was not found in our database')
  }

  donation.donationId = donationId
  donation.leaderLogin = leaderLogin
  donation.adminLogin = login
  donation.siteId = siteId
  donation.quantity = quantity
  donation.status = 1
  donation.created = timestamp
  donation.sentDate = sentDate

  await donation.updateOne(donation)
}
