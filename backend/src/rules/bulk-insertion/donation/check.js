import ProcFileException from '../../../core/process-file-exception'
import { User, Site, Donation, fileStatus } from '../../../repositories'
import genericChecker from '../check-util'

const loginDonationMapFunc = (donation) => donation.leaderLogin
const loginUserMapFunc = (user) => user.login
const getDonationIds = (donation) => donation.donationId
const getSiteIdFunc = (site) => site.siteId

const checkDonationExists = async (validDonations) => {
  const toBeAddedDocs = validDonations.map(getDonationIds)

  const existingDonations = await Donation.find({ donationId: { $in: toBeAddedDocs } }, 'donationId')

  if (existingDonations.length > 0) {
    throw new ProcFileException(
      422,
      `Pacote(s) já existente(s) no sistema ${existingDonations.map(getDonationIds).join(', ')}`,
      fileStatus.duplicated
    )
  }

  return validDonations
}

export default (validDonations) =>
  checkDonationExists(validDonations)
    .then((uniqueDonations) => genericChecker(uniqueDonations, loginDonationMapFunc, User, 'login', loginUserMapFunc, 'Usuário'))
    .then((checkSite) => genericChecker(checkSite, getSiteIdFunc, Site, 'siteId', getSiteIdFunc, 'Site'))
