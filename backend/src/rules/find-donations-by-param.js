import { Donation } from '../repositories'
import { statuses } from '../enums'

export async function findDonationsByParam (donationId) {
  if (!donationId) {
    throw new Error('A variável donationId deve ser preenchida')
  }

  if (donationId.toString().length < 3) {
    throw new Error('A variável donationId deve conter pelo menos três caracteres')
  }

  console.log({
    donationId: new RegExp(`^${donationId}`)
  })

  let donations = (
    await Donation.find(
      {
        donationId: new RegExp(`^${donationId}`)
      },
      {
        donationId: 1,
        quantity: 1,
        status: 1
      }
    )
  )

  donations = donations.map(({ donationId, quantity, status }) => ({
    donationId,
    quantity,
    status,
    statusText: statuses[status]
  }))

  return donations
}
