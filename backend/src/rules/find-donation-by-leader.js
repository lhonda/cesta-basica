import { Donation } from '../repositories'
import { statuses } from '../enums'

export async function findDonationByLeader ({ login }) {
  const donations = (
    await Donation.find({ leaderLogin: login })
  ).map(({
    donationId,
    leaderLogin,
    adminLogin,
    quantity,
    donor,
    status,
    created,
    scheduled,
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
    scheduled: scheduled || new Date(),
    received,
    lastDelivery,
    completed,
    strayed,
    point
  }))

  console.log(donations)

  return { donations }
}
