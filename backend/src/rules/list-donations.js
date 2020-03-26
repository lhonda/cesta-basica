import { Donation } from '../repositories/donation'
import { statuses } from '../enums'

export async function listDonations ({ login, role }) {
  const donations = (
    await Donation.find({ leaderLogin: login })
  ).map(({ status, donationId, login, quantity, donor, timestamp }) => ({
    status: status,
    statusText: statuses[status],
    donationId,
    login,
    quantity,
    donor,
    timestamp
  }))

  return { donations }
}
