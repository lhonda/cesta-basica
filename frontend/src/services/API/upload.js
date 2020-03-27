import { Api } from './index'

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
    }
  }

export async function Upload({ donationId, file }) {
  console.debug(file)

  const formData = new FormData()
  formData.append('file', file)

  try {
    await Api.post(`donations/${donationId}/receive`, { receiveDonationFile: file }, config)
  } catch (err) {
    return 'failed'
  }
}
