import { Donation, Site } from '../repositories'

export async function filterDonation ({
  leaderLogin,
  siteId,
  status,
  listDonationId,
  state,
  city,
  dateIn,
  dateOut
}) {
  const filterDonation = {}
  const filterSite = {}
  if (leaderLogin) {
    filterDonation.leaderLogin = leaderLogin
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
  if (dateIn) {
    filterDonation.dateIn = dateIn
  }
  if (dateOut) {
    filterDonation.dateOut = dateOut
  }

  if ((state || city) && !siteId) {
    console.log('FILTRO SITE:', filterSite)
    const listSiteId = (await Site.find(filterSite, { _id: 0, siteId: 1 }))
      .map(({ siteId }) => (siteId))
    filterDonation.siteId = { $in: listSiteId }
  }

  console.log('FILTRO DONATION:', filterDonation)
  const donations = await Donation.find(filterDonation)

  return donations
}

function regexp (value, opt) {
  return new RegExp(`^${value}$`, opt)
}
