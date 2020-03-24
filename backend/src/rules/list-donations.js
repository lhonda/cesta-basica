import { Donation } from '../repositories/donation'

export async function listDonations ({ leaderId }) {
  const query = await Donation.find({ leaderId: leaderId })

  const donations = await query.exec()
  return {
    donations: donations
  }
}
