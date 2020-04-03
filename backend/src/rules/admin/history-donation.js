import { Donation } from '../../repositories'
import { statuses } from '../../enums'

export async function listDonationHistory ({ login }) {
  const donations = await Donation.find({ adminLogin: login, status: 4 })
    .map(({
      donationId,
      leaderLogin,
      adminLogin,
      quantity,
      donor,
      status,
      created,
      received,
      lastDelivery,
      completed,
      strayed,
      point
    }) => ({
      donationId,
      leaderLogin,
      adminLogin,
      quantity,
      donor,
      status: status,
      statusText: statuses[status],
      created,
      received,
      lastDelivery,
      completed,
      strayed,
      point
    }))

  console.log(donations)

  return { donations }
}
