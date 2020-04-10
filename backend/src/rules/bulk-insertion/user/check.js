import ProcFileException from '../../../core/process-file-exception'
import { User, Site, fileStatus } from '../../../repositories'
import genericChecker from '../check-util'

const loginMapFunc = (user) => user.login
const getSiteIdFunc = (site) => site.siteId

const checkUser = async (validUsers) => {
  const toBeAddedDocs = validUsers.map(loginMapFunc)

  const existingUsers = await User.find({ login: { $in: toBeAddedDocs } }, 'login')

  if (existingUsers.length > 0) {
    throw new ProcFileException(
      422,
      `Usuário(s) já existente(s) no sistema ${existingUsers.map(loginMapFunc).join(', ')}`,
      fileStatus.duplicated
    )
  }

  return validUsers
}

export default (validUsers) =>
  checkUser(validUsers)
    .then((checkSite) => genericChecker(checkSite, getSiteIdFunc, Site, 'siteId', getSiteIdFunc, 'Site'))
