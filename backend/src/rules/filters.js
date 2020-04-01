import { Donation, User, Site } from '../repositories'

export async function filterDonation (donationId) {
  if (!donationId) {
    throw new Error('DonationId is required')
  }
  const donationTip = (await Donation.find({ donationId: new RegExp(`^${donationId}`) }, { donationId: 1, _id: 0 })
  ).map(donation => donation.donationId)

  return donationTip
}

export async function filterSite (name) {
  if (!name) {
    throw new Error('Name is required')
  }
  const siteTip = (await Site.find({ name: new RegExp(`^${name}`) }, { name: 1, _id: 0 })
  ).map(site => site.name)
  console.log(siteTip)

  return siteTip
}

export async function filterLeader (name) {
  if (!name) {
    throw new Error('Name is required')
  }
  const nameTip = (await User.find({ role: 'leader', name: new RegExp(`^${name}`) }, { name: 1, _id: 0 })
  ).map(leader => leader.name)

  return nameTip
}
