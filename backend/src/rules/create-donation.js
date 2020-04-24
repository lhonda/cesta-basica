import { Donation } from '../repositories'

export async function createDonation ({
  createdBy,
  leaderLogin,
  siteId,
  donationId,
  quantity,
  sentDate
}) {
  if (!leaderLogin) {
    throw new Error('A variável leaderLogin deve ser preenchida')
  }

  if (!siteId) {
    throw new Error('A variável siteId deve ser preenchida')
  }

  if (!donationId) {
    throw new Error('A variável donationId deve ser preenchida')
  }

  if (!quantity) {
    throw new Error('A variável quantity deve ser preenchida')
  }

  if (!sentDate) {
    throw new Error('A variável sentDate deve ser preenchida')
  }

  const donation = await Donation.findOne({ donationId })

  if (donation) {
    throw new Error(`A variável donationId ${donationId} já está cadastrada`)
  }

  return Donation.create({
    donationId,
    leaderLogin,
    adminLogin: createdBy,
    siteId,
    quantity,
    status: 1,
    sentDate
  })
}
