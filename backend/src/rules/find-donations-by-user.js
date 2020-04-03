import { findDonationsByAdmin } from './find-donations-by-admin'
import { findDonationsByLeader } from './find-donations-by-leader'

export async function findDonationsByUser (user) {
  return user.role === 'admin'
    ? findDonationsByAdmin()
    : findDonationsByLeader(user)
}
