import { Donation } from '../repositories/donation'

export async function listDonations(leaderLogin) {
  const donations = (await Donation.find({ leaderLogin }))
    .map(({ status, _id: id, donationId, leaderLogin, quantity, donor }) =>
      ({ id, status, donationId, leaderLogin, quantity, donor })
    )

  return { donations }
}
