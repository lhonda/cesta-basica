import { User, Donation, Voucher, Site } from '../repositories'

const dataEntity = {
  vouchers: voucherData,
  donations: donationData,
  leaders: leaderData,
  sites: siteData
}

export function reportData (entity, filter) {
  return dataEntity[entity](filter)
}

async function voucherData ({
  leaderName,
  siteId,
  status,
  listDonationId,
  state,
  city,
  dateTo,
  dateFrom
}) {
  const filterVoucher = {}
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
    filterVoucher.status = status
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
    filterVoucher.created = {}
  }
  if (dateTo) {
    filterVoucher.created.$lte = dateTo
  }
  if (dateFrom) {
    filterVoucher.created.$gte = dateFrom
  }

  if ((state || city) && !siteId) {
    const listSiteId = (await Site.find(filterSite, { _id: 0, siteId: 1 }))
      .map(({ siteId }) => (siteId))
    filterDonation.siteId = { $in: listSiteId }
  }

  const voucherList = await Donation.find(filterDonation).distinct('donationId')

  const vouchers = Promise.all(
    voucherList.map(async (donationId) => {
      filterVoucher.donationId = donationId
      console.log(filterVoucher)
      const voucher = await Voucher.find(filterVoucher)
      console.log(voucher)
      return voucher
    }))

  return vouchers
}

async function donationData ({
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

async function leaderData ({ name, siteName, state, city }) {
  // if (name !== new RegExp('^')) {
  //   return User.find({ name })
  // }

  const sites = await Site.aggregate([
    {
      $match: {
        name: siteName,
        state,
        city
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'siteId',
        foreignField: 'siteId',
        as: 'users'
      }
    }
  ])

  return sites[0].users
}

async function siteData (filter) {
  const sites = await Site.find(filter)
  console.log(filter)
  return sites
}

function regexp (value, opt) {
  return new RegExp(`^${value}$`, opt)
}
