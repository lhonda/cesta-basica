import { Donation } from '../repositories/donation'

export async function listDonations ({ leaderLogin }) {
  const query = await Donation.find({ leaderLogin: leaderLogin })

  const donations = await query.exec()
  return {
    donations: donations
  }
}
