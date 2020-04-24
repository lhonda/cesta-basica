import { findDonationsByParam, findDonationsByLeader, findDonationsByAdmin } from '../rules'

export async function findDonationsByUser (user, donationId) {
  if (user.role === 'admin' && donationId) {
    return findDonationsByParam(donationId)
  } if (user.role === 'admin') {
    return findDonationsByAdmin()
  } else if (user.role === 'leader') {
    return findDonationsByLeader(user)
  } else {
    throw new Error('Apenas líderes e administradores possuem acesso à essa rota')
  }
}
