import { Donation, Site, User } from '../repositories'

export async function updateDonation (
  { login },
  leaderName,
  siteName,
  donationId,
  quantity,
  sendDate
) {
  if (!leaderName) {
    throw new Error('leaderName is required')
  }

  if (!siteName) {
    throw new Error('siteName is required')
  }

  if (!donationId) {
    throw new Error('donationId is required')
  }

  if (!quantity) {
    throw new Error('quantity is required')
  }

  if (!sendDate) {
    throw new Error('sendDate is required')
  }

  const donation = await Donation.findOne({ donationId })
  const site = await Site.findOne({ name: siteName })
  const user = await User.findOne({ name: leaderName })
  const timestamp = new Date()

  donation.donationId = donationId
  donation.leaderLogin = user.login
  donation.adminLogin = login
  donation.site = site.name
  donation.city = site.city
  donation.state = site.state
  donation.quantity = quantity
  donation.status = 1
  donation.created = timestamp
  donation.scheduled = sendDate

  await donation.updateOne(donation)
}
