const { User, Donation, Voucher, Site } = require('./models')

const dataEntity = {
  voucher: voucherData,
  donation: donationData,
  user: userData,
  site: siteData
}

module.exports = (entity, filter) => {
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
  const matchVoucher = []
  const matchDonation = {}
  const matchSite = {}
  if (leaderName) {
    const user = await User.findOne({ name: new RegExp(`^.*${leaderName}.*`, 'i') }, { _id: 0, login: 1 })
    user ? matchDonation.leaderLogin = user.login : matchDonation.leaderLogin = undefined
  }
  if (siteId) {
    matchDonation.siteId = siteId
  }
  if (status) {
    matchVoucher.push({ $eq: [ "$status", status ] })
  }
  if (listDonationId) {
    if (!Array.isArray(listDonationId)) {
      throw new Error('listDonationId must be an Array')
    }
    const listDonationIdResolved = listDonationId.map(donation => regexp(donation, 'i'))
    matchDonation.donationId = { $in: listDonationIdResolved }
  }
  if (state) {
    matchSite.state = regexp(state, 'i')
  }
  if (city) {
    matchSite.city = regexp(city, 'i')
  }
  if (dateTo || dateFrom) {
    matchVoucher.created = {}
  }
  if (dateTo) {
    matchVoucher.push({ $lte: [ "$created", dateTo ] })
  }
  if (dateFrom) {
    matchVoucher.push({ $gte: [ "$created", dateFrom ] })
  }

  if ((state || city) && !siteId) {
    const listSiteId = (await Site.find(matchSite, { _id: 0, siteId: 1 }))
      .map(({ siteId }) => (siteId))
    matchDonation.siteId = { $in: listSiteId }
  }

  matchVoucher.push({ $eq: ["$donationId", "$$donId"] })
  console.log(matchVoucher)

  const vouchers = await Donation.aggregate([
    {
      $match: matchDonation
    },
    {
      $lookup: {
        from: 'users',
        let: { login: "$leaderLogin" },
        pipeline: [
          { $match: { $expr: { $eq: ["$login", "$$login" ] } } },
          { $project: { name: "$name",  } }
        ],
        as: 'leader'
      }
    },
    {
      $lookup: {
        from: 'sites',
        localField: 'siteId',
        foreignField: 'siteId',
        as: 'sites'
      }
    },
    {
      $lookup: {
        from: "vouchers",
        let: { donId: "$donationId" },
        pipeline: [
          { $match: { $expr: { $and: matchVoucher } } },
        ],
        as: "vouchers"
      }
    },
    {
      $project: {
        vouchers: "$vouchers",
        sites: "$sites",
        leader: "$leader.name"
      }
    }
  ]).exec()

  let response = []
  vouchers.forEach(project => {
    site = project.sites[0]
    leader = project.leader[0]
    response = response.concat(project.vouchers.map(v => {
      return {
        ...v,
        site,
        leader
      }
    }))
  });

  return response
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
  const matchDonation = {}
  const matchSite = {}
  if (leaderName) {
    const user = await User.findOne({ name: new RegExp(`^.*${leaderName}.*`, 'i') }, { _id: 0, login: 1 })
    user ? matchDonation.leaderLogin = user.login : matchDonation.leaderLogin = undefined
  }
  if (siteId) {
    matchDonation.siteId = siteId
  }
  if (status) {
    matchDonation.status = status
  }
  if (listDonationId && Array.isArray(listDonationId) && listDonationId.length > 0) {
    const listDonationIdResolved = listDonationId.map(donation => regexp(donation, 'i'))
    matchDonation.donationId = { $in: listDonationIdResolved }
  }
  if (state) {
    matchSite.state = regexp(state, 'i')
  }
  if (city) {
    matchSite.city = regexp(city, 'i')
  }
  if (dateTo || dateFrom) {
    matchDonation.created = {}
  }
  if (dateTo) {
    matchDonation.created.$lte = [ "$created", dateTo ]
  }
  if (dateFrom) {
    matchDonation.created.$gte = [ "$created", dateFrom ]
  }

  if ((state || city) && !siteId) {
    const listSiteId = (await Site.find(matchSite, { _id: 0, siteId: 1 }))
      .map(({ siteId }) => (siteId))
    matchDonation.siteId = { $in: listSiteId }
  }

  const donations = await Donation.aggregate([
    {
      $match: matchDonation
    },
    {
      $lookup: {
        from: 'users',
        let: { login: "$leaderLogin" },
        pipeline: [
          { $match: { $expr: { $eq: ["$login", "$$login" ] } } },
          { $project: { name: "$name" } }
        ],
        as: 'leader'
      }
    },
    {
      $lookup: {
        from: 'sites',
        localField: 'siteId',
        foreignField: 'siteId',
        as: 'sites'
      }
    },
    {
      $lookup: {
        from: "vouchers",
        let: { donId: "$donationId" },
        pipeline: [
          { $match: { $expr: { $and: [ { $eq: ["$donationId", "$$donId"] }] } } },
        ],
        as: "vouchers"
      }
    },
    {
      $project: {
        vouchers: "$vouchers",
        site: { $arrayElemAt: ["$sites", 0] },
        donationId: "$donationId",
        leaderLogin: "$leaderLogin",
        receivedDate: "$received",
        quantity: "$quantity",
        leaderName: {$arrayElemAt: ["$leader.name", 0]},
      }
    }
  ]).exec()

  let response = []
  donations.forEach(project => {
    let delivered = 0
    let received = 0
    let notDelivered = 0
    project.vouchers.map(v => {
      switch (v.status) {
        case 1:
          received++
          break;
        case 2:
          delivered++
          break;
        case 3:
          notDelivered++
          break;
      }
    })
    response.push({
      ...project,
      vouchers: {
        delivered,
        notDelivered,
        received
      }
    })
  })

  return response
}

async function userData ({ name, siteName, state, city }) {
  const nameReg = (name ? new RegExp(`^.*${name}.*`, 'i') : /^/)
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
          let: { siteId: "$siteId" },
          pipeline: [
            {
              $match: {
                name: nameReg,
                $expr:{
                  $and: [
                    { $eq: ["$siteId", "$$siteId"] },
                  ]
                }
              }
            }
          ],
          as: 'users'
        }
      },
      {
        $project: {
          city: "$city",
          state: "$state",
          siteName: "$name",
          users: "$users"
        }
      }
    ])

    let users = []
    sites.map(s => users = users.concat(s.users.map(u => ({ ...u, city: s.city, state: s.state, siteName: s.siteName }))))
    return users
}

async function siteData (filter) {
  const sites = await Site.find(filter)
  return sites
}

function regexp (value, opt) {
  return new RegExp(`^${value}$`, opt)
}