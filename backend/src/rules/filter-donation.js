import { Donation, Site, User } from '../repositories'

export async function filterDonation ({
  leaderName,
  siteId,
  status,
  listDonationId,
  state,
  city,
  dateTo,
  dateFrom
}) {
  const filterDonation = {}
  const filterSite = {}
  if (leaderName) {
    const user = await User.findOne({ name: leaderName }, { _id: 0, login: 1 })
    user ? filterDonation.leaderLogin = user.login : filterDonation.leaderLogin = undefined
  }
  if (siteId) {
    filterDonation.siteId = siteId
  }
  if (status) {
    filterDonation.status = status
  }
  if (listDonationId) {
    if (!Array.isArray(listDonationId)) {
      throw new Error('listDonationId must be an Array')
    }
    const listDonationIdResolved = listDonationId.map(donation => regexp(donation, 'i'))
    filterDonation.donationId = { $in: listDonationIdResolved }
  }
  if (state) {
    filterSite.state = regexp(state, 'i')
  }
  if (city) {
    filterSite.city = regexp(city, 'i')
  }
  if (dateTo || dateFrom) {
    filterDonation.created = {}
  }
  if (dateTo) {
    filterDonation.created.$lte = dateTo
  }
  if (dateFrom) {
    filterDonation.created.$gte = dateFrom
  }

  if ((state || city) && !siteId) {
    const listSiteId = (await Site.find(filterSite, { _id: 0, siteId: 1 }))
      .map(({ siteId }) => (siteId))
    filterDonation.siteId = { $in: listSiteId }
  }

  const donations = await Donation.find(filterDonation)

  return donations
}

function regexp (value, opt) {
  return new RegExp(`^${value}$`, opt)
}
