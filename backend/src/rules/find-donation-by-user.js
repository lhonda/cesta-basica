import { findDonation } from './find-donations'
import { findDonationByLeader } from './find-donation-by-leader'

export async function findDonationByUser (user) {
  return user.role === 'admin'
    ? findDonation()
    : findDonationByLeader(user)
}
