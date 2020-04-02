import { Donation, User, Site } from '../repositories'

export async function filterDonation (donationId) {
  if (!donationId) {
    throw new Error('DonationId is required')
  }
  const donationTip = (await Donation.find({ donationId: new RegExp(`^${donationId}`) }, { donationId: 1 })
  ).map(({ donationId }) => ({ donationId }))

  return donationTip
}

export async function filterSite (name) {
  if (!name) {
    throw new Error('Name is required')
  }
  const siteTip = (await Site.find(
    {
      name: new RegExp(`^${name}`)
    },
    {
      siteId: 1,
      name: 1
    })
  ).map(({ name, siteId }) => ({ name, siteId }))

  return siteTip
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
      login: 12
    })
  ).map(({ name, login }) => ({ name, login }))

  return nameTip
}
