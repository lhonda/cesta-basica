import { Donation } from '../repositories/donation'

export async function listDonations ({ login, role }) {
  const donations = (
    await Donation.find({ login })
  ).map(({ status, donationId, login, quantity, donor, timestamp }) => ({
    status,
    donationId,
    login,
    quantity,
    donor,
    timestamp
  }))

  return { donations }
}
