import { findDonation } from './find-donations'
import { findDonationByLeader } from './find-donation-by-leader'

export async function findDonationByUser (user) {
  console.log(user)
  console.log(user.login)
  return user.role === 'admin'
    ? findDonation()
    : findDonationByLeader(user)
}
