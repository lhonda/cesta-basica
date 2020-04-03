import { Donation } from '../repositories'
import { statuses } from '../enums'

export async function findDonationsByAdmin () {
  const donations = (
    await Donation.find()
  ).map(({
    donationId,
    leaderLogin,
    adminLogin,
    quantity,
    donor,
    status,
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
    adminLogin,
    quantity,
    donor,
    status: status,
    statusText: statuses[status],
    created,
    scheduled: scheduled || new Date(),
    sentDate,
    received,
    lastDelivery,
    completed,
    strayed,
    point
  }))

  return { donations }
}
