import { Donation, Voucher } from '../repositories'

export async function endDonation ({ donationId }) {
  if (!donationId) {
    throw new Error('A variável donationId deve ser preenchida')
  }

  const donation = await Donation.findOne({ donationId })
  const vouchers = await Voucher.findOne({ donationId, status: 1 })

  if (vouchers) {
    throw new Error('Você não pode finalizar a doação enquanto não tiver entregue todos os cartões')
  }

  donation.status = 4
  donation.completed = new Date()
  await donation.save()
}
