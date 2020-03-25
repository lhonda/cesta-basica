import { Donation } from '../repositories/donation'

export async function listDonations(leaderLogin) {
  const donations = (await Donation.find({ leaderLogin }))
    .map(({ status, donationId, leaderLogin, quantity, donor }) =>
      ({ status, donationId, leaderLogin, quantity, donor })
    )

  return { donations }
}
