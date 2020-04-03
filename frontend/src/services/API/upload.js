import { Api } from './index'
import { compressImageFile } from '../../utils/compressFile'

export async function Upload({ lat, lon, donationId, file, receivedQuantity }) {

  const compressedFile = await compressImageFile(file)

  const formData = new FormData()
  formData.append('receiveDonationFile', compressedFile)
  formData.append('receivedQuantity', receivedQuantity)
  formData.append('lat', lat)
  formData.append('lon', lon)

  try {
    await Api.post(`donations/${donationId}/receive`, formData, { headers: {
      'Content-Type': 'multipart/form-data',
  }})
  } catch (err) {
    return 'failed'
  }
}
