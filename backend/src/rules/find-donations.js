import { Donation } from '../repositories'
import { statuses } from '../enums'

export async function findDonation (donationId) {
  if (donationId) {
    const donations = (await Donation.find({ donationId: new RegExp(`^${donationId}`) }, { donationId: 1 })
    ).map(({ donationId }) => ({ donationId }))

    return donations
  }
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
