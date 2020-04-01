import { Donation } from '../repositories'
import { statuses } from '../enums'

export async function findDonation () {
  console.log('findALL')
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

  return { donations }
}
