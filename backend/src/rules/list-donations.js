import { Donation } from '../repositories/donation'

export async function listDonations ({ leaderId }) {
  const donations = await Donation.find({ leaderId: leaderId })
  return {
    donations: donations
  }
}
