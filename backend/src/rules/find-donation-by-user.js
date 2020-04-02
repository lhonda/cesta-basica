import { findDonation } from './find-donations'
import { findDonationByLeader } from './find-donation-by-leader'

export async function findDonationByUser (donationId, user) {
  return user.role === 'admin'
    ? findDonation(donationId)
    : findDonationByLeader(user)
}
