import { Donation, User, Site } from '../repositories'
import { statuses } from '../enums'

export async function detailsDonation ({ donationId }) {
  if (!donationId) {
    throw new Error('DonationId is required')
  }
  try {
    const donations = await Donation.findOne({ donationId })
      .map(async ({
        donationId,
        leaderLogin,
        siteId,
        quantity,
        receivedQuantity,
        donor,
        status,
        receivedCardsS3Key,
        created,
        scheduled,
        sentDate,
        received,
        lastDelivery,
        completed,
        strayed,
        point
      }) => {
        const leader = await User.findOne({ login: leaderLogin }, { name: 1 })

        if (!leader) {
          throw new Error('Invalid leaderLogin')
        }

        const site = await Site.findOne({ siteId }, { name: 1, city: 1, state: 1 })

        if (!site) {
          throw new Error('Invalid siteId')
        }

        const leaderName = leader.name
        const siteName = site.name
        const { city, state } = site

        return {
          donationId,
          leaderLogin,
          leaderName,
          siteId,
          siteName,
          city,
          state,
          quantity,
          receivedQuantity,
          donor,
          status,
          statusText: statuses[status],
          receivedCardsS3Key,
          created,
          scheduled,
          sentDate,
          received,
          lastDelivery,
          completed,
          strayed,
          point
        }
      })
    return { donations }
  } catch (error) {
    if (error.message === 'Invalid leaderLogin') {
      throw new Error(error.message)
    }
    if (error.message === 'Invalid siteId') {
      throw new Error(error.message)
    }
    throw new Error(`Does not exists donation with donationId ${donationId}`)
  }
}
