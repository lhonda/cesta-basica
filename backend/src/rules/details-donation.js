import { Donation } from '../repositories'
import { statuses } from '../enums'

export async function detailsDonation ({ donationId }) {
  console.log(donationId)
  if (!donationId) {
    throw new Error('DonationId is required')
  }

  try {
    const donations = await Donation.findOne({ donationId })
      .map(({
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
      }) => ({
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
      }))
    return { donations }
  } catch (error) {
    throw new Error(`Does not exists donation with donationId ${donationId}`)
  }
}
