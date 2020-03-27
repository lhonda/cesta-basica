import { Api } from './index'

export async function Upload({ donationId, file }) {

  const formData = new FormData()
  formData.append('receiveDonationFile', file)
  formData.append('lat', 1)
  formData.append('lon', 2)

  try {
    await Api.post(`donations/${donationId}/receive`, formData, { headers: {
      'Content-Type': 'multipart/form-data',
  }})
  } catch (err) {
    return 'failed'
  }
}
