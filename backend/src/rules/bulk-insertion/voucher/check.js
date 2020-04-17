import { Donation, Voucher, fileStatus } from '../../../repositories'
import ProcFileException from '../../../core/process-file-exception'
import genericChecker from '../check-util'

const getDonationIds = (voucherOrDonation) => voucherOrDonation.donationId
const getVoucherIdFunc = (voucher) => voucher.voucherId

const checkVouchersExists = async (validDonations) => {
  const toBeAddedDocs = validDonations.map(getVoucherIdFunc)

  const existingDonations = await Voucher.find({ voucherId: { $in: toBeAddedDocs } }, 'voucherId')

  if (existingDonations.length > 0) {
    throw new ProcFileException(
      422,
      `Vouchers(s) já existente(s) no sistema ${existingDonations.map(getVoucherIdFunc).join(', ')}`,
      fileStatus.duplicated
    )
  }

  return validDonations
}

export default (validVouchers) =>
  checkVouchersExists(validVouchers)
    .then((checkDonation) => genericChecker(checkDonation, getDonationIds, Donation, 'donationId', getDonationIds, 'Pacote'))
