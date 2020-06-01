import { Report, Donation, Voucher } from '../repositories'
import { S3 } from '../services'

const createUrlMapper = {
  report: createSignedUrlReport,
  donation: createSignedUrlDonate,
  voucher: createSignedUrlVoucher
}

async function createSignedUrlReport (id) {
  try {
    const report = await Report.findById(id)
    if (report.status === 2) {
      const key = report.url.split('https://cesta-basica-sp.s3.amazonaws.com/')
      try {
        const url = S3.signInUrl(key[1])
        return { url }
      } catch (error) {
        throw new Error(error)
      }
    }
  } catch (error) {
    throw new Error(`Não foi possível gerar a Url com o id ${id}`)
  }
}

async function createSignedUrlDonate (donationId) {
  try {
    const { receivedCardsS3Key, status } = await Donation.findOne({ donationId })
    if (status > 1) {
      try {
        const url = S3.signInUrl(receivedCardsS3Key)
        return { url }
      } catch (error) {
        throw new Error(error)
      }
    }
  } catch (error) {
    throw new Error(`Não foi possível gerar a Url com o id ${donationId}`)
  }
}

async function createSignedUrlVoucher (voucherId) {
  try {
    const { cardDonatedS3Key, status } = await Voucher.findOne({ voucherId })
    if (status === 2) {
      try {
        const url = S3.signInUrl(cardDonatedS3Key)
        return { url }
      } catch (error) {
        throw new Error(error)
      }
    }
  } catch (error) {
    throw new Error(`Não foi possível gerar a Url com o id ${voucherId}`)
  }
}

export async function createSignedUrl (type, id) {
  return createUrlMapper[type](id)
}
