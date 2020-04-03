import { Donation, User } from '../repositories'

export async function filterDonation (donationId) {
  if (!donationId) {
    throw new Error('DonationId is required')
  }
  const donationTip = (await Donation.find({ donationId: new RegExp(`^${donationId}`) }, { donationId: 1 })
  ).map(({ donationId }) => ({ donationId }))

  return donationTip
}

export async function filterLeader (name) {
  if (!name) {
    throw new Error('Name is required')
  }
  const nameTip = (await User.find(
    {
      role: 'leader',
      name: new RegExp(`^${name}`)
    },
    {
      name: 1,
      login: 1
    })
  ).map(({ name, login, siteId }) => ({ name, login, siteId }))

  return nameTip
}
