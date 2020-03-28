import { Api } from './index'

export async function Upload({ lat, lon, donationId, file, receivedQuantity }) {

  const formData = new FormData()
  formData.append('receiveDonationFile', file)
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
