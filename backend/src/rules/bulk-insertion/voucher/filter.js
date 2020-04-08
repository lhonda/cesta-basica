import HttpException from '../../../core/http-exception'
import { CPF_REGEX, DONATION_ID_REGEX, VOUCHER_ID_REGEX } from '../filter-util'

const forEachFunc = (
  [
    lineNumber,
    [
      voucherId, donationId, leaderLogin
    ]
  ],
  sucess,
  erros,
  created
) => {
  // VALIDAR DADOS DOS CAMPOS DE ENTRADA AQUI

  if (!CPF_REGEX.test(leaderLogin) || !DONATION_ID_REGEX.test(donationId) || !VOUCHER_ID_REGEX.test(voucherId)) {
    return erros.push(parseInt(lineNumber, 10) + 1)
  }

  return sucess.push({
    voucherId,
    donationId,
    leaderLogin,
    status: 1,
    created
  })
}

export default async (data) => {
  const invalid = []
  const valid = []
  const currentDate = new Date()
  Object.entries(data).forEach((line) => forEachFunc(line, valid, invalid, currentDate))
  if (invalid.length > 0) {
    throw new HttpException(422, `Dado(s) inconsistente(s) na(s) linha(s) ${invalid.join(', ')}`)
  }
  return valid
}
