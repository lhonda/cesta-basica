import { Donation, User } from '../repositories'
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
        site,
        city,
        state,
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
        const { name } = await User.findOne({ login: leaderLogin }, { name: 1 })

        return {
          donationId,
          leaderLogin,
          name,
          siteId,
          site,
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
    throw new Error(`Does not exists donation with donationId ${donationId}`)
  }
}
